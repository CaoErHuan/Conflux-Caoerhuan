package vrf

import (
	"crypto/ecdsa"
	"encoding/json"

	"github.com/google/uuid"
	"github.com/smartcontractkit/chainlink/core/utils"

	"fmt"
	"math/big"

	"github.com/smartcontractkit/chainlink/core/services/signatures/secp256k1"

	"github.com/ethereum/go-ethereum/accounts/keystore"
	"github.com/pkg/errors"
	"go.dedis.ch/kyber/v3"
)

// PrivateKey represents the secret used to construct a VRF proof.
//
// Don't serialize directly, use Encrypt method, with user-supplied passphrase.
// The unencrypted PrivateKey struct should only live in-memory.
//
// Only use it if you absolutely need it (i.e., for a novel crypto protocol.)
// Implement whatever cryptography you need on this struct, so your callers
// don't need to know the secret key explicitly. (See, e.g., MarshaledProof.)
type PrivateKey struct {
	k         kyber.Scalar
	PublicKey secp256k1.PublicKey
}

var suite = secp256k1.NewBlakeKeccackSecp256k1()

// newPrivateKey(k) is k wrapped in a PrivateKey along with corresponding
// PublicKey, or an error. Internal use only. Use cltest.StoredVRFKey for stable
// testing key, or CreateKey if you don't need determinism.
func newPrivateKey(rawKey *big.Int) (*PrivateKey, error) {
	if rawKey.Cmp(secp256k1.GroupOrder) >= 0 || rawKey.Cmp(big.NewInt(0)) <= 0 {
		return nil, fmt.Errorf("secret key must be in {1, ..., #secp256k1 - 1}")
	}
	sk := &PrivateKey{}
	sk.k = secp256k1.IntToScalar(rawKey)
	pk, err := suite.Point().Mul(sk.k, nil).MarshalBinary()
	if err != nil {
		panic(errors.Wrapf(err, "could not marshal public key"))
	}
	if len(pk) != secp256k1.CompressedPublicKeyLength {
		panic(fmt.Errorf("public key %x has wrong length", pk))
	}
	if l := copy(sk.PublicKey[:], pk[:]); l != secp256k1.CompressedPublicKeyLength {
		panic(fmt.Errorf("failed to copy correct length in serialized public key"))
	}
	return sk, nil
}

// MarshaledProof is a VRF proof of randomness using i.Key and seed, in the form
// required by VRFCoordinator.sol's fulfillRandomnessRequest
func (k *PrivateKey) MarshaledProof(i PreSeedData) (
	MarshaledOnChainResponse, error) {
	return GenerateProofResponse(secp256k1.ScalarToHash(k.k), i)
}

// gethKey returns the geth keystore representation of k. Do not abuse this to
// convert a VRF key to an ethereum key!
func (k *PrivateKey) gethKey() *keystore.Key {
	return &keystore.Key{
		Address:    k.PublicKey.Address(),
		PrivateKey: &ecdsa.PrivateKey{D: secp256k1.ToInt(k.k)},
	}
}

// fromGethKey returns the vrfkey representation of gethKey. Do not abuse this
// to convert an ethereum key into a VRF key!
func fromGethKey(gethKey *keystore.Key) *PrivateKey {
	secretKey := secp256k1.IntToScalar(gethKey.PrivateKey.D)
	rawPublicKey, err := secp256k1.ScalarToPublicPoint(secretKey).MarshalBinary()
	if err != nil {
		panic(err) // Only way this can happen is out-of-memory failure
	}
	var publicKey secp256k1.PublicKey
	copy(publicKey[:], rawPublicKey)
	return &PrivateKey{secretKey, publicKey}
}

// CreateKey makes a new VRF proving key from cryptographically secure entropy
func CreateKey() (key *PrivateKey) {
	sk := suite.Scalar().Pick(suite.RandomStream())
	k, err := newPrivateKey(secp256k1.ToInt(sk))
	if err != nil {
		panic(errors.Wrapf(err, "should not be possible to error, here"))
	}
	return k
}

// NewPrivateKeyXXXTestingOnly is for testing purposes only!
func NewPrivateKeyXXXTestingOnly(k *big.Int) *PrivateKey {
	rv, err := newPrivateKey(k)
	if err != nil {
		panic(err)
	}
	return rv
}

// String reduces the risk of accidentally logging the private key
func (k *PrivateKey) String() string {
	return fmt.Sprintf("PrivateKey{k: <redacted>, PublicKey: %s}", k.PublicKey)
}

// GoStringer reduces the risk of accidentally logging the private key
func (k *PrivateKey) GoStringer() string {
	return k.String()
}

// passwordPrefix is added to the beginning of the passwords for
// EncryptedVRFKey's, so that VRF keys can't casually be used as ethereum
// keys, and vice-versa. If you want to do that, DON'T.
var passwordPrefix = "don't mix VRF and Ethereum keys!"

func adulteratedPassword(auth string) string {
	return passwordPrefix + auth
}

// Encrypt returns the key encrypted with passphrase auth
func (k *PrivateKey) Encrypt(auth string, scryptParams utils.ScryptParams) (*EncryptedVRFKey, error) {
	keyJSON, err := keystore.EncryptKey(k.gethKey(), adulteratedPassword(auth),
		scryptParams.N, scryptParams.P)
	if err != nil {
		return nil, errors.Wrapf(err, "could not encrypt vrf key")
	}
	rv := EncryptedVRFKey{}
	if e := json.Unmarshal(keyJSON, &rv.VRFKey); e != nil {
		return nil, errors.Wrapf(e, "geth returned unexpected key material")
	}
	rv.PublicKey = k.PublicKey
	roundTripKey, err := Decrypt(&rv, auth)
	if err != nil {
		return nil, errors.Wrapf(err, "could not decrypt just-encrypted key!")
	}
	if !roundTripKey.k.Equal(k.k) || roundTripKey.PublicKey != k.PublicKey {
		panic(fmt.Errorf("roundtrip of key resulted in different value"))
	}
	return &rv, nil
}

// Decrypt returns the PrivateKey in e, decrypted via auth, or an error
func Decrypt(e *EncryptedVRFKey, auth string) (*PrivateKey, error) {
	// NOTE: We do this shuffle to an anonymous struct
	// solely to add a a throwaway UUID, so we can leverage
	// the keystore.DecryptKey from the geth which requires it
	// as of 1.10.0.
	keyJSON, err := json.Marshal(struct {
		Address string              `json:"address"`
		Crypto  keystore.CryptoJSON `json:"crypto"`
		Version int                 `json:"version"`
		Id      string              `json:"id"`
	}{
		Address: e.VRFKey.Address,
		Crypto:  e.VRFKey.Crypto,
		Version: e.VRFKey.Version,
		Id:      uuid.New().String(),
	})
	if err != nil {
		return nil, errors.Wrapf(err, "while marshaling key for decryption")
	}
	gethKey, err := keystore.DecryptKey(keyJSON, adulteratedPassword(auth))
	if err != nil {
		return nil, errors.Wrapf(err, "could not decrypt key %s",
			e.PublicKey.String())
	}
	return fromGethKey(gethKey), nil
}

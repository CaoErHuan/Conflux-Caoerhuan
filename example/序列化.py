from phe import paillier
import json
import sys
import urllib.request
import urllib.parse
import time
import pickle
import json

p = 2073858748171673411122309352056488163669572986503842192023546564122875707803609965065527185558114630110760150208881830879320025811817853349357254119754846845776912171788301502183341612228570406722016068283487628916639003661218111321336366680611111144011171656960310078378697575858018833215233859539403714904487285618905205529805224704444258037504191081875159686323550481470670332036820281032077890822735817217324670351462770064330438656521127017958958187599079611
q = 2245493138294782369545049425872455017499632741652068313684742703030482700581007798478076680581238347242889928263754083879052879779707981901826700159557129484408546682847500614185754627110927089198193543487560839521403394001254646318716288993011386670222351929173201622065132703557061164630279586729125626530239537986560010800322015070710398525080029143583518562770416475662775582649080517659891400702456091439590886560863597700662479831708300693393892803948630251
n =p*q
public_key = paillier.PaillierPublicKey(n)
private_key = paillier.PaillierPrivateKey(public_key, p, q)

print(private_key)










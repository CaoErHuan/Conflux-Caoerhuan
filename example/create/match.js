var node = [
    {value: 100, address: '0x85266B67470315CD19e00415b1B0d61175852D07'},
    {value: 100, address: '0x1009718FbfB77efDab3d33b6cfdCaC69e6c39ae7'},
    {value: 100, address: '0x0C6a1775886ed15E18cfbEDA123C51D0419162fa'}
  ]
  

   var getData= node.find(function (nums) {
      return nums.address == "0x1009718FbfB77efDab3d33b6cfdCaC69e6c39ae7"
  })
  
    console.log(getData.address) 
  
  
  
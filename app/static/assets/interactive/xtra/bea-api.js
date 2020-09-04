d3.json(urlBEA, function(err, data) {
  
  let array = data['BEAAPI']['Results']['ParamValue'];

  array.forEach(e => {

    console.log('e :>> ', e);
    
  });


});

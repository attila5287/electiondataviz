let $yearStart = d3.select('#yearStart');
let $yearEnd = d3.select('#yearEnd');


$yearEnd.on('change',function() { 
  console.log('+this.value :>> ', +this.value);

})
;

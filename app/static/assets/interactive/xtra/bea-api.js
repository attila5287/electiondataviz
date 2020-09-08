d3.json(urlBEA, function(err, json) {
  // console.log('API menu :>> ', json);
  let menu = json['BEAAPI']['Results']['ParamValue'];
  // console.log('menu :>> ', menu);
  // console.table(menu);
  var dd = d3 // dropdown
    .select('#api-menu')
    .classed('custom-select-lg rnd-xl dd',true)
    .selectAll('.classed')
    .data(menu)
    ;
    
    var options = dd // options of dd
    .enter()
    .append('option')
    .attr('value', (d,i)=>i)
    .classed('bg-info text-light text-lg',true)
    .attr('data-title', d=>d.Key)
    .attr('data-name', d=>d.Desc)
    .attr('data-number', (d,i)=>i)
    .text(d=> `${d.Key}: ${d.Desc}`)
    ;

    d3.select('#api-menu')
      .on('change', function() { 
      // console.log('this :>> ', this); //HTML element select
      // console.log('this.value :>> ', +this.value); //
      console.log('this[value] :>> ', this[+this.value]); //
    })
    ;
    
});


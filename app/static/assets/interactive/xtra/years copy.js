
let $startSelected = d3.select('#yrStSel');
let $yearStart = d3.select('#yearStart');
let $startPrev = d3.select('#yrStPrv');
let $startNext = d3.select('#yrStNxt');

$yearStart.on('change',function() { 
  $startNext.text(+this.value+1); 
  $startSelected.text(+this.value); 
  $startPrev.text(+this.value-1); 
});

let $endSelected = d3.select('#yrEndSel');
let $yearEnd = d3.select('#yearEnd');
let $endPrev = d3.select('#yrEndPrv');
let $endNext = d3.select('#yrEndNxt');

$yearEnd.on('change',function() { 
  $endNext.text(+this.value+1); 
  $endSelected.text(+this.value); 
  $endPrev
    .transition()
    .duration(2000)
    .text(+this.value-1); 
})
;
// text-left custrange-year

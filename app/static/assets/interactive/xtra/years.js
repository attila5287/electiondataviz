function yearSelectStart() {
  const defIndex = 1976;

  let $yearStart = d3.select( '#yearStart' );
  $yearStart.attr( 'value', defIndex );
  
  console.log( 'userInput :>> ', defIndex );
  let parseTime = d3.timeParse( "%Y" ); // display only year

  let width = $( `#jackpotYrStart` ).width();
  let height = $( `#jackpotYrStart` ).height();

  let svg = d3.select( '#jackpotYrStart' )
    .append( 'svg' )
    .attr( 'width', width )
    .attr( 'height', height );

  let plotGroup = svg.append( 'g' )
    .classed( 'plot', true );

  let scale = d3.scaleTime()
    .domain( [ parseTime(defIndex-1), parseTime(defIndex+1) ] )
    .range( [ 0, height ] )
    ;

  let axis = d3
    .axisLeft( scale )
    .ticks( d3.timeYear.every( 1 ) )
    .tickFormat( d3.timeFormat( "%Y" ) )
    ;

  let axisGroup = plotGroup.append( 'g' )
    .classed( 'jackpot', true );

  function jackpotRight( userInput, axG,  parseTime, height ) {
    let scale = d3.scaleTime()
      .domain( [ parseTime(userInput-1), parseTime(userInput+1) ] )
      .range( [ height , 0 ] );

    let axis = d3
      .axisRight( scale )
      .ticks( d3.timeYear.every( 1 ) )
      .tickFormat( d3.timeFormat( "%Y" ) );

    axG
     .transition()
    //  .ease( d3.easeBounce )
     .ease( d3.easeElastic )
     .duration( 1500 )
     .call( axis );
    }
    
    jackpotRight( defIndex, axisGroup, parseTime, height );
    d3.select( '#yearStart' )
      .on( 'change', function () {
        checkStartEndYears();
        console.log( '+this.value :>> ', +this.value );
        jackpotRight( +this.value, axisGroup,  parseTime, height );
    } )
}
yearSelectStart()

function yearSelectEnd() {
  const defIndex = 2020;

  let $yearEnd = d3.select( '#yearEnd' );
  $yearEnd.attr( 'value', defIndex );
  console.log( 'userInput :>> ', defIndex );
  let parseTime = d3.timeParse( "%Y" ); // display only year

  let width = $( `#jackpotYrEnd` ).width();
  let height = $( `#jackpotYrEnd` ).height();

  let svg = d3.select( '#jackpotYrEnd' )
    .append( 'svg' )
    .attr( 'width', width )
    .attr( 'height', height );

  let plotGroup = svg.append( 'g' )
    .classed( 'plot', true );

  let scale = d3.scaleTime()
    .domain( [ parseTime(defIndex-1), parseTime(defIndex+1) ] )
    .range( [ 0, height ] );

  let axis = d3
    .axisRight( scale )
    .ticks( d3.timeYear.every( 1 ) )
    .tickFormat( d3.timeFormat( "%Y" ) );

  let axisGroup = plotGroup.append( 'g' )
    .classed( 'jackpot', true );

  function jackpotRight( userInput, axG,  parseTime, height ) {
    let scale = d3.scaleTime()
      .domain( [ parseTime(userInput-1), parseTime(userInput+1) ] )
      .range( [ height , 0 ] );

    let axis = d3
      .axisRight( scale )
      .ticks( d3.timeYear.every( 1 ) )
      .tickFormat( d3.timeFormat( "%Y" ) );

    axG
     .transition()
    //  .ease( d3.easeBounce )
     .ease( d3.easeElastic )
     .duration( 1500 )
     .call( axis );
    }
    
    jackpotRight( defIndex, axisGroup, parseTime, height );
    d3.select( '#yearEnd' )
      .on( 'change', function () {
        checkStartEndYears();
        console.log( '+this.value :>> ', +this.value );
        jackpotRight( +this.value, axisGroup,  parseTime, height );
    } )
}
yearSelectEnd()
function checkStartEndYears() {
  let start = +$( `#yearStart` )[0].value;
  let end = +$( `#yearEnd` )[0].value;
  // console.log('start :>> ', +start);
  // console.log('end :>> ', +end);
  let errMsgStart='';
  let errMsgEnd='';
  
  if (start<end) {
    let pass= 'year input check'
    console.log('pass :>> ', pass);
    d3.select('#errYrSt').text('');
    d3.select('#errYrEnd').text('');
  } else {
    errMsgStart = 'Start year should come before end';
    errMsgEnd   = 'End year should come after start';
    d3.select('#errYrSt').text(errMsgStart);
    d3.select('#errYrEnd').text(errMsgEnd);
    d3.select('#yearStart').attr('value', 1976);
    d3.select('#yearEnd').attr('value', 2019);

  }
  }
checkStartEndYears();

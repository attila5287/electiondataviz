function yearSelectStart(defIndex) {
  // const defIndex = 1976;
  // console.log('yr start :>> ', defIndex);

  let $yearStart = d3.select( '#yearStart' );
  $yearStart.attr( 'value', defIndex );
  
  // console.log( 'userInput :>> ', defIndex );
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

  function jackpotLeft( userInput, axG,  parseTime, height ) {
  
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
    
  jackpotLeft( defIndex, axisGroup, parseTime, height );
  d3.select( '#yearStart' )
    .on( 'change', function () {
      console.log( 'left start year:>> ', +this.value );

      jackpotLeft( +this.value, axisGroup,  parseTime, height );
    if (checkStartEndYears(+this.value)) {
          jackpotLeft( +this.value, axisGroup,  parseTime, height );
          
          console.log( 'IF year str :>> ', +this.value );
        } else {
          
          console.log( 'ELSE year str :>> ', +this.value );
          
          jackpotLeft( +this.value-1, axisGroup,  parseTime, height );


        }
  } )
    

  function checkStartEndYears(userInput) {
    // let start = +$( `#yearStart` )[0].value;
    let end = +$( `#yearEnd` )[0].value;
    // console.log('start :>> ', +start);
    console.log('end :>> ', +end);
    let errMsgStart='';
    let errMsgEnd='';

    if (userInput<end) {
      let pass= 'year input check'
      console.log('pass :>> ', pass);
      d3.select('#errYrSt').text('');
      d3.select('#errYrEnd').text('');

      return true;
    } else {
      errMsgStart = 'Start year should come before end';
      // errMsgEnd   = 'End year should come after start <hr> try again';
      d3.select('#errYrSt').text(errMsgStart);
      // d3.select('#errYrEnd').text(errMsgEnd);
      alert(errMsgStart);
      // alert(errMsgEnd);
      // let x = 1976*1;
      // let z = 2019*1;
      d3.select('#yearStart').attr('value', +userInput-1);
      // d3.select('#yearEnd').attr('value', userInput+1);

      return false;
  }
  } 
}
function yearSelectEnd(defIndex) {
  // const defIndex = 2020;
  // console.log('yr end  :>> ', defIndex);
      
  let $yearEnd = d3.select( '#yearEnd' );
  $yearEnd.attr( 'value', defIndex );
  // console.log( 'userInput :>> ', defIndex );
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
        
        if (checkStartEndYears(+this.value)) {
          jackpotRight( +this.value, axisGroup,  parseTime, height );
          console.log( 'IF year end right :>> ', +this.value );
        } else {
          console.log( 'ELSE year end right :>> ', +this.value );
          jackpotRight( +this.value-1, axisGroup,  parseTime, height );
        }

    } )

  function checkStartEndYears(userInput) {
    let start = +$( `#yearStart` )[0].value;
    // let end = +$( `#yearEnd` )[0].value;
    // console.log('start :>> ', +start);
    // console.log('end :>> ', +end);
    let errMsgStart='';
    let errMsgEnd='';

    if (userInput>start) {
      let pass= 'year input check'
      console.log('pass :>> ', pass);
      d3.select('#errYrSt').text('');
      d3.select('#errYrEnd').text('');

      return true;

    } else {
      // errMsgStart = 'Start year should come before end';
      errMsgEnd   = 'End year should come after start';
      // d3.select('#errYrSt').text(errMsgStart);
      d3.select('#errYrEnd').text(errMsgEnd);
      alert(errMsgEnd)
      // let x = 1976*1;
      // let z = 2019*1;
      // d3.select('#yearStart').attr('value', x);
      d3.select('#yearEnd').attr('value', userInput+1);

      return false;
  }
  } 
}
yearSelectStart(1976);
yearSelectEnd(2020);

const prepOptions = data => { // dropdown options
  var r = d3.nest()
    .key( d => d.state )
    .entries( data.filter( d => d.year == 2016 && d.party == 'republican' ) );
  var d = d3.nest()
    .key( d => d.state )
    .entries( data.filter( d => d.year == 2016 && d.party == 'democrat' ) );
  let states = r.map(d => d.key);

  let margins = {};
  let closest10 = []; // margin Top 10
  let closest20 = []; // margin Top 10-20
  const abs = x => Math.round( Math.abs( x ) );

  for ( let i = 0; i < r.length; i++ ) {
    let st = r[ i ].key; // state name
    let rx = r[ i ].values[ 0 ].candidatevotes; // rep votes
    let dx = d[ i ].values[ 0 ].candidatevotes; // dem votes
    let to = r[ i ].values[ 0 ].votes; // total, could also use d

    margins[ st ] = abs( ( dx - rx ) / to * 10000 ) / 100;

    if ( margins[ st ] < 4.50 ) {
      closest10.push( st );
    } else if ( margins[ st ] < 14.00 ) {
      closest20.push( st );
    }
  }
  let medHHITop = []; // highest median household income Top
  let medHHIBase = []; // lowest median household income Base
  states.forEach(s => {// populate groups 
    // console.log(`s :>> ${s}: ${medianHHIbySt[ s ]}`);
    if (medianHHIbySt[ s ] > 72000) {
      medHHITop.push(s);
    }
     else if (medianHHIbySt[ s ]<55000) {
      medHHIBase.push(s);
    }
  });    

  let minWageTop = [];
  let minWageBase = [];

  states.forEach(s => {
    if (minWageBySt[s]>=11.00) {
      minWageTop.push(s);
    } else if(minWageBySt[s]<=7.25) {
      minWageBase.push(s);
    }
  });
  // console.log('minWageTop :>> ', minWageTop);
  // console.log('minWage :>> ', minWageBase);
  let medAgeYoung =[]  ; // med age avg top
  let medAgeOlder =[]  ; // '' '' base

  states.forEach(s => {//lets take colorado the last
    if (medAgeBySt[s]<37) {
      medAgeYoung.push(s);
    } else if(medAgeBySt[s]>40) {
      medAgeOlder.push(s);
    }

  });

  let seatNumHigh = []; // seats in electoral collage
  let seatNumLow = []; // seat number relatively lower
  
  
  states.forEach(s => {
    if (seatsByStateName[s]>8) {
      seatNumHigh.push(s)
    } else if(seatsByStateName[s]<5) {
      seatNumLow.push(s)
    }
  });

//----FINAL FOR-EACH NOW RE-GROUP
  // ----- RETURNS result (dict of dicts) ----- //
  let result = {};
  result[ 'Closest Margin' ] = closest10;
  result[ 'Close Margin' ] = closest20;
  result[ 'Household Inc. Leaders' ] = medHHITop;
  result[ 'Household Inc. Base' ] = medHHIBase;
  result[ 'Min Wage Leaders' ] = minWageTop;
  result[ 'Min Wage Base' ] = minWageBase;
  result[ 'Younger Population' ] = medAgeYoung;
  result[ 'Senior Population' ] = medAgeOlder;
  result[ 'More Electoral Seats' ] = seatNumHigh;
  result[ 'Less Electoral Seats' ] = seatNumLow;

  // console.log('res :>> ', result);

  return result;
};

function suggestionsUp( data ) {// select>options menu>dynamic loading btn's
  // console.log('data :>> ', data);
  $suggestions = d3.select('#suggested-states');//nav-pills
  const dataReady =  prepOptions(data);
  $menu = d3.select("#suggest-menu");//select element
  $menu.selectAll('option').remove(); // rmv each load
  // <option class="px-1" value="" selected hidden >SuggestedSets</option>
  $menu
    .append('option')
    .attr('class', 'text-comfo text-light text-center', true)
    .attr('value','' )
    .attr('selected',true )
    .attr('hidden',true )
    .text("Suggestions...")
    ;
    let value = 0;
  Object.keys(dataReady).forEach(k => {// generates options
    var option = $menu.append("option");
    value = value+1;

    option
      .text(k)
      .attr('value', value)
      .classed( 'text-comfo', true );
  });

  $menu.on( "change", function () {// event listener
    $suggestions.selectAll('a').remove(); // rmv each selection
    const selected_key = Object.keys(dataReady)[+this.value-1];

    let states_suggested = dataReady[selected_key];
    states_suggested.forEach(e => {// append large buttons
      // console.log('e :>> ', e);
      let $anchor = $suggestions
        .append('a')
        .classed('nav-item nav-link btn-outline-info st-btn py-1 my-1', true)
        .attr("data-name", e)
        .attr("value", e)
        .text(e)
        ;

      $anchor.on("click", function () {
        init(e);
      });
    });

  } );
  

  
}

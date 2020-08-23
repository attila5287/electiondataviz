const prepOptions = data => { // dropdown options
  var r = d3.nest()
    .key( d => d.state )
    .entries( data.filter( d => d.year == 2016 && d.party == 'republican' ) );
  var d = d3.nest()
    .key( d => d.state )
    .entries( data.filter( d => d.year == 2016 && d.party == 'democrat' ) );


  let margins = {};
  let group01 = []; // states with fewer than 2%
  let group02 = []; // states with fewer than %
  let group03 = []; // states with fewer than %
  const abs = x => Math.round( Math.abs( x ) );

  for ( let i = 0; i < r.length; i++ ) {
    let st = r[ i ].key; // state name
    let rx = r[ i ].values[ 0 ].candidatevotes; // rep votes
    let dx = d[ i ].values[ 0 ].candidatevotes; // dem votes
    let to = r[ i ].values[ 0 ].votes; // total

    margins[ st ] = abs( ( dx - rx ) / to * 10000 ) / 100;

    if ( margins[ st ] < 1.50 ) {
      group01.push( st );
    } else if ( margins[ st ] < 4.50 ) {
      group02.push( st );
    } else if ( margins[ st ] < 8.250 ) {
      group03.push( st );
    }
  }




  // console.log('margins :>> ', margins.sort((a, b) => a - b));
  let result = {};
  result[ 'Closest 0-5' ] = group01;
  result[ 'Closest 5-10' ] = group02;
  result[ 'Closest 10-15' ] = group03;
  return result;
};

function suggestionsUp( data ) {
  // console.log('data :>> ', data);
  $suggestions = d3.select('#suggested-states');//nav-pills
  const dataReady =  prepOptions(data);
  $menu = d3.select("#suggest-menu");//select element
  $menu.selectAll('option').remove(); // rmv each load
  // <option class="px-1" value="" selected hidden >SuggestedSets</option>
  $menu
    .append('option')
    .classed('text-comfo text-light', true)
    .attr('value','' )
    .attr('selected',true )
    .attr('hidden',true )
    .text('SuggestedSets')
    ;
    let value = 0;
  Object.keys(dataReady).forEach(k => {// generates options
    var option = $menu.append("option");
    value = value+1;
    option
    .text(k)
    .attr('value', value)
    .classed( 'text-robo', true );
  });
  let def_key = Object.keys(dataReady)[0];
  let def_states = dataReady[def_key];
  renderSuggestNav(def_states);

  $menu.on( "change", function () {// event listener
    const selected_key = Object.keys(dataReady)[+this.value-1];
    let states_suggested = dataReady[selected_key];
    renderSuggestNav(states_suggested);
  } );
}
function renderSuggestNav(arr){// 
  console.log('arr :>> ', arr);
  d3.select('#suggested-btns')
    .append('svg')
  const svgArea = d3.select( '#suggested-btns' ).select( "svg" );
  // clear svg is not empty
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }
  
  // Step 1: Set up our chart
  let svgWidth = $( `#suggested-btns` ).width();
  
  let svgHeight = 0.04 * svgWidth;
  console.log('svgWidth :>> ', svgWidth);
  console.log('svgHeight :>> ', svgHeight);
  let margin = {
    top: 10,
    right: 10,
    left: 10, 
    bottom: 10,
  };

  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;

  let svg = d3
    .select( `#suggested-btns` )
    .append( "svg" )
    .classed( "bg-glass rnd-2xl p-1", true )
    .attr( "width", svgWidth )
    .attr( "height", svgHeight );

  let chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );
var xBandScale = d3.scaleBand()
    .domain(arr)
    .range([0, width])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(arr)])
    .range([height, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
 
  let bars = chartGroup.selectAll(".bar")
    .data(arr)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", d => xBandScale(0))
    .attr("y", d => yLinearScale(0))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => 0 )
        .attr( "rx", "5px" )
    .attr( "ry", "5px" )
    .attr( "fill", "#2aa198" )
    .attr( "stroke-width", "1px" )
    .attr( "stroke", "#2aa198" )
    .attr( "stroke-opacity", "0.9" )
    ;

  // Animation
  svg.selectAll( "rect" )
    .transition()
    .duration( 2000 )
    .attr("x", d => xBandScale(d))
    .attr("y", d => yLinearScale(height))
    .attr( "height", d=> height )
    .delay(  ( d, i ) => ( i * 555 ))
    ; 

    
    bars
    .append( "text" )
    .attr( "fill", "#b58900" )
    .attr( "class", "axisGold text-digi text-xlarger" )
    .attr( "x",  d  => xBandScale( d ) )
    .attr( "y", ( d ) => yLinearScale( height ) )
    .attr( "dx", "10" )
    .attr( "dy", "20" )
    .text( ( d ) =>  d ) ;

}

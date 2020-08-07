
function prepStateDemo( state ) { // data prep for demographic
  const fPerct = d3.format( ".4" );
  const fComma = d3.format( "," );

  const selected = { // numeric columns
    'whitePerc':diversityPart1[state].white,
    'minTotal':diversityPart1[ state ].minTotal+1,
    'hispPerc':diversityPart1[ state ].hisp,
    'blackPerc': diversityPart2[ state ].black,
    'asianPerc': diversityPart2[ state ].asian,
    'nativePerc': diversityPart2[ state ].native,
  };
    // diversityBySt[state].minTotal

  const numcols = [ // numeric columns
    'whitePerc',
    'minTotal',
    'hispPerc',
    'blackPerc',
    'asianPerc',
    'nativePerc',
  ];

  const labels = { // numeric labels
    'whitePerc': 'White',
    'minTotal': 'Minority Total',
    'hispPerc': 'Hispanic',
    'blackPerc': 'African-American',
    'asianPerc': 'Asian',
    'nativePerc': 'Native',
  };

  const prepends = { // before the animated part
    'whitePerc': '',
    'minTotal': '',
    'hispPerc': '',
    'blackPerc': '',
    'asianPerc': '',
    'nativePerc': '',
  };

  const appends = { // after the animated part
    'whitePerc': ' %',
    'minTotal': ' %',
    'hispPerc': ' %',
    'blackPerc': ' %',
    'asianPerc': ' %',
    'nativePerc': ' %',
  };

  let result = [];

  numcols.forEach( d => {
    let obj = {};
    obj[ 'label' ] = labels[ d ];
    obj[ 'value' ] = +selected[ d ];
    obj[ 'prepend' ] = prepends[ d ];
    obj[ 'append' ] = appends[ d ];

    result.push( obj );
  } );

  // console.log( 'result :>> ', result[ 3 ] );
  
  // console.log( 'result :>> ', result );
  return result;
}

function prepStateMain( state ) { // data prep array of objs
  const fPerct = d3.format( ".4" );
  const fComma = d3.format( "," );

  const compiled = {
    'numOfSeat' : +seatsByState[ state ], 
    'over18Perc': +over18PercBySt[ state ],
    'medHHI' : Math.floor(+medianHHIbySt[ state ]/1000), 
    'medAge': +medAgeBySt[ state ], 
    'minWage': +minWageBySt[ state ], 
  };

  const numcols = [ // st numeric columns
    'numOfSeat',
    'over18Perc',
    'medHHI',
    'medAge',
    'minWage',
  ];

  const labels = { // labels 
    'numOfSeat': 'Num House Seats',
    'over18Perc': 'Pop. Over18',
    'medHHI': 'Mdn. Household Inc.',
    'medAge': 'Median Age',
    'minWage': 'Minimum Wage',
  };

  const prepends = { //before countup not animated 
    'numOfSeat': '',
    'over18Perc': '',
    'medHHI': '$ ',
    'medAge': '',
    'minWage': '$ ',
  };

  const appends = { // after the countup not animated
    'numOfSeat': '',
    'over18Perc': ' %',
    'medHHI': afterThousands(+medianHHIbySt[ state ])+' /yr',
    'medAge': ' yrs.',
    'minWage': ' /hr',
  };

  function afterThousands(number) {
    const comma = ", ";
    const zero = "0";
    
    if(number%1000 == +number%10){
      return comma+zero+zero+number%1000;
    }
    
    if(number%1000 == +number%100){
      return comma+zero+number%1000;
    }
    return ", "+number%1000;
  };


  let result = [];
  numcols.forEach( d => {
    let obj = {};
    obj[ 'value' ] = +compiled[ d ];
    obj[ 'label' ] = labels[ d ];
    obj[ 'prepend' ] = prepends[ d ];
    obj[ 'append' ] = appends[ d ];

    result.push( obj );
  } );
  // console.log( 'result :>> ', result[ 3 ] );
  console.log( 'result :>> ', result );
  return result;
}

// renderStateMain( prepStateMain( "Colorado" ) );
// renderStateDemo( prepStateDemo( "Colorado" ) );

function renderStateDemo ( dataReady ) { // countup st demographic
  // console.log('dataReady :>> ', dataReady);
  d3.select("#hldr-diversity").selectAll("li").selectAll("span").remove();
  d3.select("#hldr-diversity").selectAll("li").remove();
  dataReady.forEach(d => {
    console.log('d :>> ', d);
    var li = d3.select("#hldr-diversity").append("li").classed('list-group-item bg-transparent text-lg py-0',true);
    li.text(d.label)
    .classed( 'text-light', true )
      ;
    li.append( "span" )
      .classed( 'countup led-lg text-primary', true )
      .html(d.value + " %")
      .attr( 'cup-start', 0 )
      .attr( 'cup-end', d.value )
      .attr( 'cup-prepend', d.prepend )
      .attr( 'cup-append', d.append )
      ;
  });
// var presidents = ["Washington", "Adams", "Jefferson"];
// function render() {
//   for (var i = 0; i < presidents.length; i++) {
//     // Then dynamicaly generating buttons for each movie in the array.
//     var a = d3.select("#presidents-view").append("h2");
//     // Adding a class
//     a.attr("class", "prez")
//     // Adding a data- attribute with the name of the president
//     .attr("data-name", presidents[i])
//     // Adding a data- attribute with the number of the presidency
//     .attr("data-number", i+1)
//     // Setting the text of the HTML <h2> element to be the president's name
//     .text(presidents[i]);
//   }
// }

// // Call the function to render the page.
// render();

  // const list =listElements = d3
  //   .select( '.hldr' )
  //   .data( dataReady )
  //   .attr( 'class', 'bg-transparent')
  //   ;
  //   listElements
  //   .selectAll("li")
  //   .enter()
  //   .append( "span" )
  //   .classed( 'countup led-lg text-primary', true )
  //   .attr( 'cup-end', d => d.value )
  //   .attr( 'cup-append', d => d.append )
  //   .attr( 'cup-prepend', d => d.prepend )
  //   .exit()
  //   .remove()
  //   ;

} 

function renderStateMain ( dataReady ) { // countup st demographic
  // console.log('dataReady :>> ', dataReady);
  d3.select("#hlder-main").selectAll("li").selectAll("span").remove();
  d3.select("#hlder-main").selectAll("li").remove();
  dataReady.forEach(d => {
    console.log('d :>> ', d);
    var li = d3.select("#hlder-main").append("li").classed('list-group-item bg-transparent text-lg py-0',true);
    li.text(d.label)
    .classed( 'text-light', true )
      ;
-+98
    li.append( "span" )
      .classed( 'countup led-lg text-primary', true )
      .html(d.value + " %")
      .attr( 'cup-start', 0 )
      .attr( 'cup-end', d.value )
      .attr( 'cup-prepend', d.prepend )
      .attr( 'cup-append', d.append )
      ;

    
  });

} 

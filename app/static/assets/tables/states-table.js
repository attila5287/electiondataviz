const format = d3.format( ',' );
 const formatBigNum = d3.format( ',' );
 let urlTest = "../static/data/states.csv";
 const columnsDisplayed = [ "Province_State", "Deaths", "Confirmed", "Recovered", "Active" ];

 //  tableInteractive( urlTest, columnsDisplayed );
 tableInteractive( urlCompiled, columnsDisplayed );

 function tableInteractive( url, c0lumns ) {
   // const format = d3.format( ',' );
   let columns = [ 'Flag' ];
   c0lumns.forEach( element => {
     columns.push( element )
   } );
   let table = d3.select( "#table-goes-here" )
     .append( "table" )
     .attr( "class", "table table-condensed table-striped table-hover text-center text-xlarger py-0 text-success" ),
     thead = table.append( "thead" ),
     tbody = table.append( "tbody" );

   d3.csv( url, function ( error, data ) {
     // Get every column value
     // let  columns = Object.keys( data[ 0 ] );

     const rankDicts = rankingDict( data );
     // console.log(rankDicts);
     let header = thead.append( "tr" )
       .selectAll( "th" )
       .data( columns )
       .enter()
       .append( "th" )
       .attr( "class", "shadow-after" )
       .text( function ( d ) {
         return d;
       } )
       .on( "click", function ( d ) {
         if ( d == "Province_State" ) {
           rows.sort( function ( a, b ) {
             if ( a[ d ] < b[ d ] ) {
               return -1;
             }
             if ( a[ d ] > b[ d ] ) {
               return 1;
             } else {
               return 0;
             }
           } );
         } else if ( d.split( " " )[ 0 ] == "Percent" ) {
           rows.sort( function ( a, b ) {
             return +b[ d ].split( "%" )[ 0 ] - +a[ d ].split( "%" )[ 0 ];
           } );
         } else {
           rows.sort( function ( a, b ) {
             return b[ d ] - a[ d ];
           } );
         }
       } );
     let rows = tbody.selectAll( "tr" )
       .data( data )
       .enter()
       .append( "tr" )
       .on( "mouseover", function ( d, i ) {
         d3.select( this )
           .attr( "class", "shadow-after add-anime" );
         numBoxUp( d, i );
         rankBoxUp( rankDicts, d, i );
         barChartUp( d, i );
         rowChartUp( d, i );
       } )
       .on( "mouseout", function ( d ) {
         // console.log('d :>> ', d);
         d3.select( this )
           .attr( "class", "shadow-before" );

         vizBoxDown();
       } );

     let cells = rows.selectAll( "td" )
       .data( function ( row ) {
         return columns.map( function ( d, i ) {
           if ( d == "Flag" ) {
             return {
               i: d,
               value: row.Province_State.trim().toLowerCase().replace( ' ', '-' )
             };
           } else {
             return {
               i: d,
               value: row[ d ]
             };
           }
         } );
       } )
       .enter()
       .append( "td" )
       .html( function ( d ) {
         if ( d.i == "Flag" ) {
           return '<img class="img-thumbnail bordered add-anime" src="' +
             '/static/img/states/' +
             d.value +
             '-flag-small.png' +
             '" alt="' +
             d.value +
             '  " style="height: 2rem;opacity:70%"></img>';
         } else if ( d.i == "Province_State" ) {
           return '<strong>' +
             '<em>' +
             d.value +
             '</em>' +
             '</strong>';
         } else {
           return format( d.value );
         }
       } );
     // console.log('d :>> ', cells);
   } );
 }

 function numBoxUp( d, i ) {
   let z = {};
   z.Active = +d.Active;
   z.Confirmed = +d.Confirmed;
   z.Recovered = +d.Recovered;
   z.People_Tested = +d.People_Tested;
   z.Deaths = +d.Deaths;
   z.People_Hospitalized = +d.People_Hospitalized;
   // console.table(z);
   const zKeys = Object.keys( z );
   let listOfValues = [];
   const zValues = zKeys.map( ( key ) => {
     return format( d[ key ] );
   } );

   // console.log('zValues :>> ', zValues);
   // console.log('zKeys :>> ', zKeys);

   const zKeysv1 = [ "Active", "Confirmed", "Recovered", "Tested", "Deaths", "Hospitalized" ];

   const cardTitles = d3
     .select( '#num-box' )
     .selectAll( '.category-title' )
     .data( zKeysv1 )
     .text( function ( d ) {
       return d;
     } );

   const cardTexts = d3
     .select( '#num-box' )
     .selectAll( '.number-of-person' )
     .data( zValues )
     .text( function ( d ) {
       return d;
     } );

   d3.select( '#num-box' )
     .selectAll( '.name-title' )
     .text( d.Province_State );

   d3.select( '#num-box' )
     .select( "img" )
     .style( "height", "3rem" )
     .attr( "src", '/static/img/states/' + d.Province_State.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
 }

 function vizBoxDown() {
   d3.select( '#bar-chart-horizontal' )
     .select( 'svg' )
     .remove();
   d3.select( '#bar-chart-vertical' )
     .select( 'svg' )
     .remove();
 }

 function rankingDict( data ) {
   function dictGen( columnName ) {
     const sorted = data.sort( function ( a, b ) {
       return b[ columnName ] - a[ columnName ];
     } );
     // console.log('sorted :>> ', sorted);
     let dict = {};
     sorted.forEach( ( d, i ) => {
       dict[ d.Province_State ] = i + 1;
     } );
     return dict;
   }
   categories = [ "Active", "Confirmed", "Recovered", "People_Tested", "Deaths", "People_Hospitalized" ];
   const output = categories.map( column => {
     return dictGen( column );
   } );
   // console.log('output only rankings:>> ', output);
   // console.table(output);
   return output;
 }

 function rankBoxUp( arrOfSortedDict, d, i ) {
   const name = d.Province_State;
   let out = arrOfSortedDict.map( dict => dict[ d.Province_State ] );
   // console.log('out :>> ', out);
   const rankings = d3
     .select( '#num-box' )
     .selectAll( '.ranking-order' )
     .data( out )
     .text( function ( d ) {
       return d;
     } );
 }

 function barChartUp( d, i ) {
   console.log( d );
   console.log( i );
   let preSelected = [ 'Incident_Rate', 'Mortality_Rate',
     'Testing_Rate', 'Hospitalization_Rate'
   ];

   let data = [];
   Object.keys( d ).map( function ( colName ) {
     const condition = preSelected.includes( colName );
     if ( condition ) {
       data.push( {
         name: colName,
         value: d[ colName ]
       } );
     }
   } );
   console.log( 'data :>> ', data );
   var svgWidth = window.innerWidth * .5;
   var svgHeight = svgWidth * .75;

   var margin = {
     top: 50,
     right: 30,
     bottom: 80,
     left: 40
   };
   var chartWidth = svgWidth - margin.left - margin.right;
   var chartHeight = svgHeight - margin.top - margin.bottom;


   var svg = d3.select( "#bar-chart-vertical" ).append( "svg" )
     .attr( "height", svgHeight )
     .attr( "width", svgWidth );

   var chartGroup = svg.append( "g" )
     .attr( "transform", `translate(${margin.left}, ${margin.top})` );
   var labels = data.map( d => d.name );
   // console.log( 'labels :>> ', labels );
   const n = [ "Hospitalization",
     "Incident",
     "Mortality",
     "Testing",
   ];
   var newLab3ls = n.map( d => d );
   // scale x to chart
   var xScale = d3.scaleBand()
     .domain( newLab3ls )
     .range( [ 0, chartWidth ] );

   var values = data.map( d => d.value );

   console.log( 'values :>> ', values );
   console.log( 'values :>> ', d3.max( values ) );

   // scale y
   var yScale = d3.scaleLinear()
     .domain( [ 0, d3.max( values ) ] )
     .range( [ chartHeight, 0 ] );
   var xAxis = d3.axisBottom( xScale );

   var barWidth = chartWidth / data.length / 2;

   let bars = chartGroup.selectAll( ".bar" )
     .data( data )
     .enter().append( "g" );

   let rects = bars.append( "rect" )
     .attr( "class", "bar opac-70" )
     .attr( "fill", "#002B36" )
     .attr( "rx", "8px" )
     .attr( "ry", "6px" )
     .style( "stroke", "#2AA198" )
     .style( "stroke-width", "1px" )
     .attr( "x", ( d, i ) => xScale( newLab3ls[ i ] ) )
     .attr( "y", d => yScale( d.value ) )
     .attr( "width", barWidth )
     .attr( "height", d => chartHeight - yScale( d.value ) );

   let xTopRotated = bars.append( "text" )
     .attr( "class", "text-digi text-xlarger axisTurq opac-50" )
     .attr( "x", ( d, i ) => xScale( newLab3ls[ i ] ) )
     .attr( "y", d => yScale( d.value ) - 10 )
     .attr( "fill", "#2aa198" )
     .text( d => format( Math.round( d.value ) ) );

  let xBottomRotated = chartGroup.append( "g" )
    .attr( "transform", `translate(0, ${chartHeight})` )
    .attr( "class", "text-orient axisGold" )
    .call( xAxis )
    .selectAll( "text" )
    .attr( "fill", "#b58900" )
    .style( "font-size", "13px" )
    .style( "text-anchor", "center" )
    .attr( "dx", "-.8em" )
    .attr( "dy", "-.55em" )
    .attr( "transform", "rotate(-30)" );


 }
 
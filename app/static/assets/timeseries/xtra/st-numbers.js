function stNumbersUpdate( state ) {
  d3.csv( '../../static/data/csv/st-info-master.csv', function ( data ) {
    console.log( 'sample row :>> ', data[ 5 ] );
    const fPerct = d3.format( ".4" );
    const fComma = d3.format( "," );
    let diversityBySt = {};

    data.forEach( d => {
      diversityBySt[ d.state ] = {
        white: +d[ 'whitePerc' ],
        hisp: +d[ 'hispPerc' ],
        black: +d[ 'blackPerc' ],
        asian: +d[ 'asianPerc' ],
        native: +d[ 'nativePerc' ],
        minTotal : 0
      };
    });

    Object.keys(diversityBySt).forEach(d=>{
      // console.log('d :>> ', d);
      // console.log('d :>> ', diversityBySt[d]);
      diversityBySt[d].minTotal = diversityBySt[d].hispPerc
                                  +diversityBySt[d].blackPerc
                                  +diversityBySt[d].asianPerc
                                  +diversityBySt[d].nativePerc;
    });

    // console.log('diversityBySt :>> ', diversityBySt[state]);

    d3.select( "#stWhite" ).text( fPerct(diversityBySt[state].white) );
    d3.select( "#stHisp" ).text( fPerct(diversityBySt[state].hisp ));
    d3.select( "#stBlack" ).text( fPerct(diversityBySt[state].black ));
    d3.select( "#stAsian" ).text( fPerct(diversityBySt[state].asian ));
    d3.select( "#stNative" ).text( fPerct(diversityBySt[state].native) );
    d3.select( "#stMinTotal" ).text( fPerct(diversityBySt[state].minTotal) );

    
    d3.select( "#stName" ).text( state );
    d3.select( "#stFlag" ).attr( 'src', '../static/img/states/' + state.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
    
    

  } );
}

function startCountingNumbers (state) {
  const fPerct = d3.format( ".4" );
  const fComma = d3.format( "," );
  d3.select( "#stMedHHI" ).text( fComma( medianHHIbySt[ state ] ) );
  d3.select( "#stMinWage" ).text( fPerct( +minWageBySt[ state ] ) );
  d3.select( "#stPop" ).text( fComma( +populationBySt[ state ] ) );
  d3.select( "#stAge18Perc" ).text( +over18PercBySt[ state ] );
  d3.select( "#stMedAge" ).text( +over18PercBySt[ state ] );
  
  
}

var arr = [50, 55, 53];

d3.selectAll(".countup")
.data(arr)
.classed('countup led-lg text-primary',true )
.attr('cup-end', d=>d)
.attr('cup-append', "")
.attr('cup-prepend', "$")
.exit()
.remove()
;
    
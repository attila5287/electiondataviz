function stNumbersUpdate( state ) {
  d3.csv( '../../static/data/csv/state_pop_race_perc.csv', function ( data ) {
    console.log( 'sample row :>> ', data[ 5 ] );
    const fPerct = d3.format( ".4" );
    const fComma = d3.format( "," );
    let diversityBySt = {};

    data.forEach( d => {
      diversityBySt[ d.state ] = {
        white: +d[ 'white' ],
        hisp: +d[ 'hisp' ],
        black: +d[ 'black' ],
        asian: +d[ 'asian' ],
        native: +d[ 'native' ],
        minTotal : 0
      };
    });

    Object.keys(diversityBySt).forEach(d=>{
      // console.log('d :>> ', d);
      // console.log('d :>> ', diversityBySt[d]);
      diversityBySt[d].minTotal = diversityBySt[d].hisp
                                  +diversityBySt[d].black
                                  +diversityBySt[d].asian
                                  +diversityBySt[d].native;
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
    d3.select( "#stMedHHI" ).text( fComma(medianHHIbySt[ state ]) );
    d3.select( "#stMinWage" ).text( fPerct(+minWageBySt[ state ]) );
    d3.select( "#stPop" ).text( fComma( +populationBySt[ state ] ) );
    d3.select( "#stAge18Perc" ).text( +over18PercBySt[ state ] );
    d3.select( "#stMedAge" ).text( +over18PercBySt[ state ] );



  } );

}

// "#stRankMedHHI"
// "#stMinWageRank"
// stNumbersUpdate( 'Arkansas' );

// prezWinners.csv
// state_minWage2020.csv
// state_population.csv
// states.csv
// president.csv
// state_HHI.csv
// state_pop_race_count.csv
// state_POs.csv
// prezTickets.csv
// state_medAge.csv
// state_pop_race_perc.csv
// state_seats.csv

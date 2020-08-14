function importTicketsCSV() { //import csv then update w/ slider
  d3.csv( '../static/data/csv/prezTickets.csv',
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {
        //--- add house seats colored circles
        importWinnerCSV( 2016 );
        updateTickets( data, 2016 );
        houseSeatsCirclesUp( data, 2016 );
      }
      // --------- slider-INPUT ----------
      d3.select( "#slider" ).on( "input", function () {
        importWinnerCSV( +this.value );
        updateTickets( data, +this.value );
        houseSeatsCirclesUp( data, +this.value );
      } );
      //--- end of csv namespace //no more (data) beyond this point
    } );
  // ---------- define inner functions  ----------
  function updateTickets( data, yearUpdated ) {
    const nested = d3.nest()
      .key( d => d.party )
      .entries( data.filter( d => d[ "year" ] == yearUpdated ) );

    // console.log('nested.filter :>> ', nested);
    const dict = {};

    nested.forEach( e => {
      // console.log('e.values[0] :>> ', e.values[0]["party"]);
      dict[ e.values[ 0 ][ "party" ] ] = e.values[ 0 ];
    } );
    // console.log('dict :>> ', dict['R']);
    // console.log('blue["prezName"] :>> ', blue["prezName"]);
    // -------------blue d3-select one by one
    const blue = dict[ 'D' ];
    d3.select( '#dem-prez' ).text( blue[ "prezName" ] );
    d3.select( '#dem-vp' ).text( blue[ "vpName" ] );
    d3.select( '#dem-vp-prior' ).text( blue[ "prior" ] );
    d3.select( '#dem-prez-prior' ).text( blue[ "prezPrior" ] );
    d3.select( '#dem-elec-vote' ).text( blue[ "eleVo" ] );
    d3.select( '#dem-pop-vote' ).text( blue[ "popVo" ] );
    d3.select( '#blue-popvote-perc' ).text( blue[ "popVo" ] );
    d3.select( '#blue-elecvote-perc' ).text( blue[ "eleVo" ] );

    // src="../static/img/cands/vp2016d.jpg" 
    d3.select( '#dem-vp-img' ).attr( "src", '../static/img/cands/vp' + yearUpdated + "d.jpg" );
    d3.select( '#dem-prez-img' ).attr( "src", '../static/img/cands/p' + yearUpdated + "d.jpg" );
    // -------------red  d3-select one by one
    const red = dict[ 'R' ];

    // // console.log('red :>> ', red);
    d3.select( '#rep-prez' ).text( red[ "prezName" ] );
    d3.select( '#rep-vp' ).text( red[ "vpName" ] );
    d3.select( '#rep-prez-prior' ).text( red[ "prezPrior" ] );
    d3.select( '#rep-vp-prior' ).text( red[ "prior" ] );
    d3.select( '#rep-vp-prior' ).text( red[ "prior" ] );

    d3.select( '#rep-elec-vote' ).text( red[ "eleVo" ] );
    d3.select( '#rep-pop-vote' ).text( red[ "popVo" ] );
    d3.select( '#red-popvote-perc' ).text( red[ "popVo" ] );
    d3.select( '#red-elecvote-perc' ).text( red[ "eleVo" ] );

    d3.select( '#rep-vp-img' ).attr( "src", '../static/img/cands/vp' + yearUpdated + "r.jpg" );
    d3.select( '#rep-prez-img' ).attr( "src", '../static/img/cands/p' + yearUpdated + "r.jpg" );
    // d3.select( '#dem-p-img' ).attr("src", '../static/img/cands/vp'+yearUpdated+"d.jpg" );
    d3.select( '#blue-house-seats' ).text( Math.round( blue[ "eleVo" ] * 535 / 100 ) );
    d3.select( '#red-house-seats' ).text( Math.round( red[ "eleVo" ] * 535 / 100 ) );
  }
}

// importTicketsCSV();

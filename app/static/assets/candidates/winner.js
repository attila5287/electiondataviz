function importWinnerCSV( year ) { //import csv each update
  // console.log('importWinnerCSV importing prezWinners');
  d3.csv( '../static/data/csv/prezWinners.csv',
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {
        // since slider
        updateWinner( data, year );
      }

      function updateWinner( data, sliderYear ) { //Party Img Prez Name  
        console.log( 'updateWinner under importWinnerCSV sliderYear :>> ', sliderYear );

        const d = data.filter( d => d[ "year" ] == sliderYear )[ 0 ];

        const imgParty = '../static/img/party/' + d.party + '.png';

        d3.select( '#prez-name' ).text( d.president );
        d3.select( '#party-img' ).attr( "src", imgParty );
        d3.select( '#party-name' ).text( d.party );
      }

    } );
}

// importWinnerCSV( 2016 );

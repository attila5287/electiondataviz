// --------------------- SLIDER ----------------
d3.select( "#slider" ).on( "input", function () {
  slideWinner( data, +this.value );
} );
function slideWinner( data, sliderYear ) {
  console.log( 'prezWinnersUp sliderYear :>> ', sliderYear );

  const d = data.filter( d => d[ "year" ] == sliderYear )[ 0 ];
  
  const imgParty = '../static/img/party/' + d.party + '.png';
  
  d3.select( '#prez-name' ).text( d.president );
  d3.select( '#party-img' ).attr( "src", imgParty );
  d3.select( '#party-name' ).text( d.party );

  // const imgPrez = '../static/img/prez/' + sliderYear + '.jpg';
  // d3.select( '#prez-img' ).attr( "src", imgPrez );
}

function init( year ) {
  d3.csv( '../static/data/csv/prezWinners.csv',
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {


      }
    } );
}
init(2016);

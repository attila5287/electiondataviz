// console.log('test global var seatByStatePO :>> ', seatByStatePO);
// console.log('test global var nameByStatePO :>> ', nameByStatePO);
var urlPrezT3st = '../static/data/csv/president.csv';
var urlTickets = '../static/data/csv/prezTickets.csv';

function mapTopRibbon( year ) {
  const urlPrezWTest = '../static/data/csv/prezWinners.csv';
  d3.csv( urlPrezWTest,
    ( error, data ) => {
      if ( error ) {
        console.error( error );
      } else {
        function slideWinner( data, sliderYear ) {
          // [ "year", "president", "party", "prior" ]
          console.log( 'prezWinnersUp sliderYear :>> ', sliderYear );
          const d = data.filter( d => d[ "year" ] == sliderYear )[ 0 ];
          const imgPrez = '../static/img/prez/' + sliderYear + '.jpg';
          const imgParty = '../static/img/party/' + d.party + '.png';
          d3.select( '#prez-name' ).text( d.president );
          d3.select( '#prez-img' ).attr( "src", imgPrez );
          d3.select( '#party-img' ).attr( "src", imgParty );
          d3.select( '#party-name' ).text( d.party );
        }

        // --------------------- SLIDER ----------------
        d3.select( "#slider" ).on( "input", function () {
          slideWinner( data, +this.value );
        } );


      }
    } );
}

function candsVotesUp( yearUpdated ) {
  d3.csv( urlTickets, function ( err, data ) {
    const nested = d3.nest()
      .key( d => d.party )
      .entries( data.filter( d => d[ "year" ] == yearUpdated ) );

    // console.log('nested.filter :>> ', nested);
    const dict = {};

    nested.forEach( e => {
      // console.log('e.values[0] :>> ', e.values[0]["party"]);
      dict[ e.values[ 0 ][ "party" ] ] = e.values[ 0 ];
    } );
    console.log('dict :>> ', dict['R']);
    // -------------blue d3-select one by one
    const blue = dict[ 'D' ];
    console.log('blue["prezName"] :>> ', blue["prezName"]);
    d3.select( '#blue-popvote-perc' ).text( blue[ "popVo" ] );
    d3.select( '#blue-elecvote-perc' ).text( blue[ "eleVo" ] );

    // -------------red  d3-select one by one
    const red = dict[ 'R' ];
    console.log('red :>> ', red);

    d3.select( '#red-popvote-perc' ).text( red[ "popVo" ] );
    d3.select( '#red-elecvote-perc' ).text( red[ "eleVo" ] );


  } );
}

function dropDownUp( slideYear ) {
  console.log( 'slideYear on dropdown :>> ', slideYear );

  d3.csv( '../static/data/csv/president.csv',
      ( error, csvData ) => {
        if ( error ) {
          console.error( error );
        } else {
          function genDDoptions( data, year ) { 
            // data into rows
            const colors = {
              republican: "red",
              democrat: "blue",
              "democratic-farmer-labor": "blue"
            };
            const form4t = d3.format( '.4' );
            let winners = {};
            let runnerups = {};

            const nested = d3.nest()
              .key( d=> d.state )
              .key( d=> d.party )
              .rollup( function ( v ) {
                return d3.max( v, function ( d ) {
                  return d.candidatevotes;
                } );
              } )
              .entries( data.filter( d => d[ "year" ] == slideYear ) );

            nested.forEach( d => {
              winners[ d.key ] = d.values[ 0 ].key;
              // console.log('d.values[ 0 ].key :>> ', d.values[ 0 ].key);
              runnerups[ d.key ] = d.values[ 1 ].key;
            } ); 

            // console.log( 'winners :>> ', winners );
            statesData.features.forEach( d => {
              const nameState = d.properties.name;
              d.properties[ "winner" ] = winners[ nameState ];
              d.properties[ "color" ] = colors[ winners[ nameState ] ];
              // console.log('d :>> ', d.properties);
            } );

            let filteredStateTotals = d3.nest()
              .key( d => d.year )
              .key( d => d.state_po )
              .key( d => d.party )
              .rollup( function ( v ) {
                return d3.sum( v, function ( d ) {
                  return d.candidatevotes;
                } );
              } )
              .entries( data )
              .filter( d => d.key == year )[ 0 ].values;

            console.log( 'year filtered :>> ', year );
            // console.log('filteredStateTotals :>> ', filteredStateTotals);
            let options = [];
            filteredStateTotals.forEach( d => {
              let sumEach = 0;
              let obj = {};
              // console.log('d :>> ', d.key);
              // console.log('all parties  :>> ', d.values);
              d.values.forEach( z => {
                // console.log('z :>> ', z);
                sumEach = sumEach + z.value;
              } );
              // console.log('sumEach :>> ', sumEach);
              // will use below keys as Table Headers
              obj[ "Republican" ] = d.values.filter( z => z.key == "republican" )[ 0 ].value / sumEach * 100;
              obj[ "Democrat" ] = d.values.filter( z => z.key == "democrat" )[ 0 ].value / sumEach * 100;
              obj[ "Others" ] = 100 - obj[ "Republican" ] - obj[ "Democrat" ];
              obj[ "NumOfSeats" ] = seatByStatePO[ d.key ];
              obj[ "PO" ] = d.key;
              //- options push each
              obj["imageSrc"] = '/static/img/states/' + nameByStatePO[ d.key ].toLowerCase().replace( ' ', '-' ) + '-flag-small.png'
              obj[ "text" ] = `${nameByStatePO[ d.key ]}<em class="text-light opac-70 text-xs ml-1">@${slideYear}</em> `;
              obj[ "description" ] = `<em class="text-sm opac-80 mr-1">D</em> ${form4t(obj["Democrat"])}% <em class="text-sm opac-80 mr-1">R</em>${form4t(obj["Republican"])}% `,
              obj[ "value" ] = d.key;
              obj[ "selected" ] = false;
              options.push( obj );
            } );
            console.log( 'options :>> ', options );
            return options;
          }

          $( '#opts' ).ddslick( {
            data: genDDoptions( csvData, slideYear ),
            defaultSelectedIndex: 5,
            onSelected: function ( d ) {
              console.log( '<<: opts ddslick d test onSelected :>> ' );
            }
          } );
        };
      });
}

dropDownUp( 2016 );
mapTopRibbon( 2016 );
candsVotesUp( 2016 );

function prepRadialData( data, year ) {

  const numRedSeats = Math.round(eleVoByYr[ 'e' + year + 'r' ] / 100 * 535);
  const numBlueSeats = Math.round(eleVoByYr[ 'e' + year + 'd' ] / 100 * 535);
  const numOtherSeats = 538 - numRedSeats - numBlueSeats;


  // console.log( 'testttt :>> ', numRedSeats + ' ' + numBlueSeats + ' ' + numOtherSeats );

  const PI = 3.1415926535;

  const degrees = [];

  const result = [];
  const cos = n => Math.cos( n * PI / 180 );
  const sin = n => Math.sin( n * PI / 180 );

  let my = {
    democrat: "#01018B",
    republican: "#8A0101",
    independent: "#ffaf018e",
  };

  for ( let i = 3; i < 57; i++ ) {
    if ( i % 6 == 0 ) {
      // console.log('skip for corridors :>> ');
    } else {
      degrees.push( i * 3 );
    }
  }

  degrees.forEach( n => {
    for ( let radius = 25; radius > 11; radius-- ) {
      const r = radius * 0.04;
      if ( radius == 15 || radius == 20 ) {
        // console.log('skip at thirteen :>> ');
      } else {
        result.push( {
          cos: cos( n ) * r,
          sin: sin( n ) * r,
        } );
      }

    }
  } );


  for ( let i = -1; i > -3; i-- ) {
    result.pop()
  }

  let names = [];
  Object.keys( seatsByState ).forEach( s => {
    for ( let i = 0; i < seatsByState[ s ]; i++ ) {
      names.push( s.trim() );
    }
  } );

  // console.log( 'names :>> ', names );
  let winners = {};
  const nested = d3.nest()
    .key( d => d.state )
    .key( d => d.party )
    .rollup( function ( v ) {
      return d3.max( v, function ( d ) {
        return d.candidatevotes;
      } );
    } )
    .entries( data.filter( d => d[ "year" ] == year ) );

  nested.forEach( d => {
    winners[ d.key ] = d.values[ 0 ].key;
  } );

  // console.log( 'winners :>> ', winners );
   const imgAppend = {
     "democrat": "d",
     "republican": "r"
   };

   let red_total = 0;
   let blu_total = 0;
  // each dect to be modified with state name>winner>fill>flag
  for ( let i = 0; i < result.length; i++ ) {
    let d = result[ i ];
    d[ 'name' ] = names[ i ];
    d[ 'winner' ] = winners[ d[ 'name' ].trim() ];
    d[ 'fill' ] = my[ d[ 'winner' ] ];
    d['cand_img'] = 'p'+year+winners[ d[ 'name' ].trim() ].charAt(0) + '.jpg'; 
    d['flag'] = d['name'].trim().toLowerCase().replace( ' ', '-' )+'-flag-small.png';
    console.log( d );
  }
  console.log( 'finalCheck' );
  return result;
}

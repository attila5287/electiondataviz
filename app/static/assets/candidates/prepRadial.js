function prepRadialData( data, year ) {


  const numRedSeats = Math.round( eleVoByYr[ 'e' + year + 'r' ] / 100 * 535 );
  const numBlueSeats = Math.round( eleVoByYr[ 'e' + year + 'd' ] / 100 * 535 );
  const numOtherSeats = 538 - numRedSeats - numBlueSeats;

  // console.log( 'testttt :>> ', numRedSeats + ' ' + numBlueSeats + ' ' + numOtherSeats );
  // coords are 538 objects, seat position coordinates
  const PI = 3.1415926535,
    degrees = [],
    coords = [];

  // cos and sin to generate radial x-y pairs
  const cos = n => Math.cos( n * PI / 180 );
  const sin = n => Math.sin( n * PI / 180 );

  // populate electoral collage
  for ( let i = 3; i < 57; i++ ) {
    if ( i % 6 == 0 ) {
      // console.log('skip for corridors :>> ');
    } else {
      degrees.push( i * 3 );
    }
  }

  // populate electoral cont'd  
  degrees.forEach( n => {
    for ( let radius = 25; radius > 11; radius-- ) {
      const r = radius * 0.04;
      if ( radius == 15 || radius == 20 ) {
        // console.log('skip at thirteen :>> ');
      } else {
        coords.push( {
          cos: cos( n ) * r,
          sin: sin( n ) * r,
        } );
      }
    }
  } );

  // pop a few to make the count 538
  for ( let i = -1; i > -3; i-- ) {
    coords.pop()
  }
  // store winner party under state name as
  let winners = {};

  // 3740 rows of csv to be nested /grouped-by
  const nested = d3.nest()
    .key( d => d.party )
    .key( d => d.state )
    .rollup( function ( v ) {
      return d3.max( v, function ( d ) {
        return d.candidatevotes;
      } );
    } )
    .entries( data.filter( d => d[ "year" ] == year ) ).filter( d => d.key == "republican" || d.key == "democrat" );

  // grouped under parties  
  const rvals = nested.filter( d => d.key == "republican" )[ 0 ].values;
  // grouped under parties
  const bvals = nested.filter( d => d.key == "democrat" )[ 0 ].values;

  const numStates = nested[ 0 ].values.length;
  // console.log('numStates :>> ', numStates);

  let redStates = [];
  let blueStates = [];

  for ( let i = 0; i < numStates; i++ ) {
    let st = rvals[ i ].key;
    let r = rvals[ i ].value;
    let b = bvals[ i ].value;

    if ( r > b ) {
      winners[ st ] = "republican";
      redStates.push( st );
    } else {
      winners[ st ] = "democrat";
      blueStates.push( st );
    }
  }
  // append this initial for tooltip/mouseover/hover image
  const imgAppend = {
    "democrat": "d",
    "republican": "r"
  };
  // store circle colors of party
  let my = {
    democrat: "#01018B",
    republican: "#8A0101",
    independent: "#ffaf018e",
  };
  // function will return results 
  let results = [],
    totalBlu = 0,
    totalRed = 0,
    totalElect = 0;


  redStates.forEach( s => {
    // console.log('s :>> ', s);
    totalRed = totalRed + seatsByState[ s ];
  } );

  // console.log('totalRed :>> ', totalRed);

  blueStates.forEach( s => {
    // console.log('s :>> ', s);
    totalBlu = totalBlu + seatsByState[ s ];
  } );

  // console.log('totalBlu :>> ', totalBlu);
  // console.log('total chk 538 :>> ', totalBlu+totalRed);

  blueStates.forEach( s => {
    // console.log('s :>> ', s);

    // console.log('seatsByState[ s ] :>> ', seatsByState[ s.trim() ]);

    // each dect to be modified with state name>winner>fill>flag
    for ( let i = 0; i < seatsByState[ s ]; i++ ) {
      let d = {};

      d[ 'name' ] = s;
      d[ 'winner' ] = "democrat";
      d[ 'fill' ] = my[ d[ 'winner' ] ];
      d[ 'cand_img' ] = 'p' + year + winners[ d[ 'name' ].trim() ].charAt( 0 ) + '.jpg';
      d[ 'flag' ] = d[ 'name' ].trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png';

      results.push( d );
      // console.log( d );

    }

  } );

  redStates.forEach( s => {
    // console.log('s :>> ', s);
    // console.log('seatsByState[ s ] :>> ', seatsByState[ s.trim() ]);

    // each dect to be modified with state name>winner>fill>flag
    for ( let i = 0; i < seatsByState[ s ]; i++ ) {
      let d = {};
      d[ 'name' ] = s;
      d[ 'winner' ] = "republican";
      d[ 'fill' ] = my[ d[ 'winner' ] ];
      d[ 'cand_img' ] = 'p' + year + winners[ d[ 'name' ].trim() ].charAt( 0 ) + '.jpg';
      d[ 'flag' ] = d[ 'name' ].trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png';

      // -----------------
      // console.log( d );

      // -----------------
      results.push( d );
    }

  } );

  // console.log('coords :>> ', coords);
  // console.log('results :>> ', results[0]);

  // now lets use coordinates
  for ( let i = 0; i < results.length; i++ ) {
    results[ i ][ 'cos' ] = coords[ i ].cos;
    results[ i ][ 'sin' ] = coords[ i ].sin;
  }
  return results;

}

function prepRadialData( data, year) {
  
  const numRedSeats = eleVoByYr['e'+year +'r']/100*535;
  const numBlueSeats = eleVoByYr['e'+year +'d']/100*535;
  const numOtherSeats = 538-numRedSeats -numBlueSeats;


  console.log('testttt :>> ', numRedSeats+' '+ numBlueSeats+' '+numOtherSeats);
  const PI = 3.1415926535;

  const degrees = [];

  const result = [];
  const cos = n => Math.cos( n * PI / 180 );
  const sin = n => Math.sin( n * PI / 180 );
  
  let my = {
    blu: "#01018B",
    red: "#8A0101",
    other: "#ffaf018e",
  };

  for ( let i = 3; i < 57; i++ ) {
    if (i%6==0) {
      // console.log('skip for corridors :>> ');
    } else {
      degrees.push( i * 3 );
    }
  }

  degrees.forEach( n => {
    for ( let radius = 25; radius > 11; radius-- ) {
      const r = radius * 0.04;
      if (radius ==15 || radius ==20 ) {
        // console.log('skip at thirteen :>> ');
      }else {
        result.push( {cos: cos( n ) * r, sin: sin( n ) * r, fill: my.blu} );
      }

    }
  } );
  
  
  for ( let i = -1; i > -3; i-- ) {
    result.pop()
  }
  
  // console.log( 'result.length 538 -> chk :>> ', result.length );
  
  // lastly color the circles
  for ( let i = 0; i < numRedSeats; i++ ) {
    const d = result[ i ];
    d[ "fill" ] = my.red;
  }
  
  // others as gold
  for ( let i = result.length-1; i > result.length-1-numOtherSeats; i-- ) {
    const d = result[ i ];
    d[ "fill" ] = my.other;
  };
  
  
  console.log('data :>> ', data);
  return result;
}

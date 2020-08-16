function prepRadialData( numRedSeats, numBlueSeats, numOtherSeats ) {
  // numRedSeats, numBlueSeats, numOtherSeats
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
  
  
  for ( let i = -1; i > -6; i-- ) {
    result.pop()
  }
  
  // console.log( 'result.length :>> ', result.length );
  
  // lastly color the circles
  for ( let i = 0; i < numRedSeats; i++ ) {
    const d = result[ i ];
    d[ "fill" ] = my.red;
  }

  // others as gold
  for ( let i = result.length-1; i > result.length-1-numOtherSeats; i-- ) {
    const d = result[ i ];
    d[ "fill" ] = my.other;
  }
  
// console.log('result[0] :>> ', result[0]);

result.forEach(d =>{
  // console.log('d :>> ', d);
});



  return result;
}

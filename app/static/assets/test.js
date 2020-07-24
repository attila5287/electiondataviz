d3.csv( '../static/data/csv/president.csv' , function ( err, data ) {
   console.log('data :>> ', data); 

  const dataReady = prepTimeSerData(data, "Colorado");
  const numYears = dataReady.blue.count.values.length;
  let  redWins = 0;
  let  blueWins = 0;
  for (let i = 0; i < numYears; i++) {
    const red = +dataReady.blue.count.values[i].count;
    const blue = +dataReady.red.count.values[i].count;
    console.log('blue :>> ', blue);
    console.log('red :>> ', red);
    if (red>blue) {
      redWins= redWins+1;
    } else {
      blueWins = blueWins+1;
    }
  }
  console.log('if redWins :>> ', redWins);    
  console.log('else blueWins :>> ', blueWins);    
  


    
  } );

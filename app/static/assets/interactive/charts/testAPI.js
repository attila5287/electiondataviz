var urlTest = '../static/data/csv-int/unemployment.csv';

// data uni-flow

d3.csv(urlTest, function(err, json) {
  let indx = 5; // Colorado default selection
  console.log('data :>> ', json);
  
  // name and  all years as column labels
  const selected  = json[indx]; 
  
  delete  selected.name; 

  const years = Object.keys(selected); 
  console.log('years :>> ', years);

  let array = years.map(y=>{//gen 
    return {// 
      year: +y,
      value: +selected[y],
    };
  });

  console.log('array :>> ', array[0]);
  console.log('array :>> ', array[43]);
});

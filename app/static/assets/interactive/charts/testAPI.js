// var urlTest = '../static/data/csv-int/unemployment.csv';
var urlTest = '../static/data/csv-int/income-wagesalary.csv';

// data uni-flow
let index = 5; // Colorado default selection
d3.csv(urlTest, function(err, json) {
  // console.log('data :>> ', json);
  
  // name and  all years as column labels
  const selected  = json[index]; 
  
  delete  selected.name; 

  const years = Object.keys(selected); 

  let array = years.map(y=>{//generate objs
    return {
      year: +y,
      value: +selected[y],
    };
  });

  console.log('array :>> ', array[0]);
  console.log('array :>> ', array[43]);

});

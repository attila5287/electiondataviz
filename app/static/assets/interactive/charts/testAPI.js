var urlT3st = 'https://apps.bea.gov/api/data/?UserID=A3EC3F25-1AF1-438F-B629-1886E7D783C6&method=GetData&datasetname=Regional&TableName=SAINC30&LineCode=1&Year=ALL&GeoFips=STATE&ResultFormat=JSON';

d3.json(urlT3st, function(err, data) {

  console.log('dataaa :>> ', data);

});


// var urlTest = '../static/data/csv-int/unemployment.csv';
var urlTest = 'https://gist.githubusercontent.com/attila5287/2a9dd27419dc460e417386a131f78c3c/raw/928eb767be2276452b30e98c148c959ca8a0d04f/unemployment.csv';

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

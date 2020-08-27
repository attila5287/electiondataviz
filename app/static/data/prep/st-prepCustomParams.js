function genCustomParams() {// custom parameters for connected line-circle time series
      const fileNames = [ //file names to pull data
        "const-permits.csv",
        "numjobs-nonfarmpro.csv",
        "income-wagesalary.csv",
        "unemployment.csv",
        "income-percapita.csv",
        "population.csv",
      ];
  
      const labels = [ // name on input range
        "Construction Permits",
        "Num of Jobs: Non-Farm Pro",
        "Avg Earnings:Wage Salary",
        "Unemployment Rate",
        "Income Per Capita",
        "Total Population",
      ];
      let results = [];
  
      for ( let i = 0; i < fileNames.length; i++ ) {
        results.push( {
          index: +i,
          label: labels[ i ],
          file: fileNames[ i ],
        } );
      }
      // console.log('results :>> ', results);
      // console.log('results0  :>> ', results[0]);
      return results;
  };

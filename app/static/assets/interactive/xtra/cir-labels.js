function renderLineCircleLabels ( params) {
  // labels for slider from 0 to number of parameters  
  d3.select( "#custom-keys" )
    .selectAll( "i" )
    .data( params )
    .enter()
    .append( "i" )
    .html( d => `<i>${d.index}</i>` );

  d3.select( "#slider" )
    .attr( "min", 0 )
    .attr( "max", Object.keys( params ).length - 1 )
    .attr( "step", 1 )
    .property( "value", 0 ); // def selection
}

function prepLineCircleLab3ls() {// custom parameters for connected line-circle time series
      const fileNames = [//file names to pull data
        "income-percapita.csv",
        "const-permits.csv",
        "numjobs-nonfarmpro.csv",
        "income-wagesalary.csv",
        "unemployment.csv",
        "population.csv",
      ];
  
      const labels = [//name on input range
        "Income Per Capita",
        "Construction Permits",
        "Num of Jobs: Non-Farm Pro",
        "Avg Earnings:Wage Salary",
        "Unemployment Rate",
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

function prepLabelsBEA() {// custom parameters for connected 
  // line-circle time series
  
      const fileNames = [//file names to pull data
        'urlPersonalIncome',
        'urlPopulation',
        'urlCompEeByIndNAICS',
        'urlCompEeByIndSIC',
      ];
  
      const labels = [//name on input range
        "Income Per Capita",
        "Total Population",
        "Comp.of Emp.by NAICS Ind.",
        "Comp.of Emp.by SIC Ind.",
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

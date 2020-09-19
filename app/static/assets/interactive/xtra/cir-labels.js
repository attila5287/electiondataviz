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

function prepLabelsBEA() {// custom parameters for connected 
  // line-circle time series
  
      const urls = [//url names to pull data
        'bea/api/0',
        'bea/api/1',
        'bea/api/2',
        'bea/api/3',
        'bea/api/4',
        'bea/api/5',
      ];
  
      const labels = [//name on input range
        "BEA:Income Per Capita",
        "BEA:Total Population",
        "BLS:Unemployment Rate", 
        "BEA:Construction Permits", 
        "BEA:Wage-Salary Income", 
        "BEA:Num.of Non-Farm Jobs", 
      ];

      let results = [];
      for ( let i = 0; i < urls.length; i++ ) {
        results.push( {
          index: +i,
          label: labels[ i ],
          url: urls[ i ],
        } );
      }
      // console.log('results :>> ', results);
      // console.log('results0  :>> ', results[0]);
      return results;
      
};

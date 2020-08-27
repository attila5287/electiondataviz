  function updateParamLabels ( params) {
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
      .property( "value", 0 );
  }

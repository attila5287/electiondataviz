function prepRowsFromJSON( data ) {
  console.log( '--------- TABLE-ASIA ---------------- :>> ' );
  const format = d3.format( ',' );
  let abCodeByName = {},
    popByName = {};

  data.locations.forEach( d => {
    const name = d.country;
    popByName[ name ] = +d.country_population;
    abCodeByName[ name ] = d.country_code;
  } )

  // console.log('popByName :>> ', popByName);

  const groupedByDeaths = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.deaths;
      } );
    } )
    .entries( data.locations );
  // console.log('groupedByDeaths :>> ', groupedByDeaths.length);

  const names = groupedByDeaths.map( ( d ) => d.key );

  const groupedByConfirmed = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.confirmed;
      } );
    } )
    .entries( data.locations );
  // console.log('groupedByConfirmed :>> ', groupedByConfirmed.length);

  let deathsByName = {},
    confirmedByName = {};

  groupedByDeaths.forEach( d => {
    deathsByName[ d.key ] = +d.value;
  } )

  groupedByConfirmed.forEach( ( d ) => {
    confirmedByName[ d.key ] = +d.value;
  } )

// console.log('deathsByName :>> ', deathsByName);
// console.log('confirmedBy :>> ', confirmedByName);

// refresh memory: there are 266 entries but only 187 unique country names

const dataForAll = names.map(name => {
  return {
    'Flag' :'/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
    'Name': name,
    'Code': abCodeByName[name],
    'Confirmed' : confirmedByName[name],
    'Deaths' : deathsByName[name],
  }
  ;
})

function outputByGeoNames(geoJSON) {
  const names = asia.features.map(country => country.properties.name);
  return names.map(name => {
  return {
    'Flag' :'/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
    'Name': name,
    'Code': abCodeByName[name],
    'Deaths' : +deathsByName[name],
    'Confirmed' : +confirmedByName[name],
    'Population' : +popByName[name],
  }
  ;
});
}  
// const dataForAsia = outputByGeoNames(asia);
const namesAsia = asia.features.map(obj => obj.properties.name );
console.log('namesAsia :>> ', namesAsia);
const dataForAsia = namesAsia.map(name => {
  return {
    'Flag' :'/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
    'Name': name,
    'Code': abCodeByName[name],
    'Deaths' : +deathsByName[name],
    'Confirmed' : +confirmedByName[name],
    'Population' : +popByName[name],
  }
  ;
})


console.log('outputByGeoNames(asia) :>> ', outputByGeoNames(asia));
let output = {
  all : dataForAll,
  asia : dataForAsia.sort(function(a, b){
    return b["Deaths"]-a["Deaths"];
    // return b["Population"]-a ["Population"];
  })  
};
return output;
}

function renderDynamicTable( rows ) {
  // console.log('--- rows ----');
  // console.log(rows);

  const $thead = document.querySelector( "thead" );
  $thead.innerHTML = "";
  let inner = "";
  var headers = Object.keys( rows[ 0 ] );
  // console.log(headers);
  for ( var j = 0; j < headers.length; j++ ) {
    var header = headers[ j ];
    inner += '<th>' + header + '</th>';
  }
  $thead.innerHTML += inner;

  const $tbody = document.querySelector( "tbody" );
  const format = d3.format( ',' );
  $tbody.innerHTML = "";
  for ( var i = 0; i < rows.length; i++ ) {
    // Get  the sightings object and its fields
    var currentRow = rows[ i ];
    var fields = Object.keys( currentRow );
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow( i );
    for ( var j = 0; j < 1; j++ ) {
      
      var field = fields[ j ];
      var $cell = $row.insertCell( j );
      var $img = document. createElement("img");
      $img.src = currentRow[field];
      $img.class="img-thumbnail";
      $img.alt=+" thumbnail";
      $img.style="height: 4rem;";
      $cell.appendChild($img);

    }
    for ( var j = 1; j < 3; j++ ) {
      var field = fields[ j ];
      var $cell = $row.insertCell( j );
        $cell.innerText = currentRow[ field ];
        $cell.innerText = currentRow[ field ];
        
    }
    for ( var j = 3; j < fields.length; j++ ) {

      var field = fields[ j ];
      var $cell = $row.insertCell( j );
         $cell.innerText = currentRow[ field ];
        $cell.innerText = format(currentRow[ field ])
        ;
    }        
  }
}
 

// renderDynamicTable(prepRowsFromJSON( testdata ).asia);


d3.json('http://coronavirus-tracker-api.herokuapp.com/v2/locations', function(err, data) {
  renderDynamicTable(prepRowsFromJSON( data ).asia);
});

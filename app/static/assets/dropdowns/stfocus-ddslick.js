
function dropDownYearUp ( slideYear, csvData ) {
  function genDDoptions ( data, year ) {
    // data into rows
    const colors = {
      republican: "red",
      democrat: "blue",
      "democratic-farmer-labor": "blue"
    };

    const form4t = d3.format( '.4' );

    let winners = {};
    let runnerups = {};

    const nested = d3.nest()
      .key( d => d.state )
      .key( d => d.party )
      .rollup( function ( v ) {
        return d3.max( v, function ( d ) {
          return d.candidatevotes;
        } );
      } )
      .entries( data.filter( d => d[ "year" ] == slideYear ) );

    nested.forEach( d => {
      // console.log('d.values[ 0 ].key :>> ', d.values[ 0 ].key);
      winners[ d.key ] = d.values[ 0 ].key;
      runnerups[ d.key ] = d.values[ 1 ].key;
    } );

    let filteredStateTotals = d3.nest()
      .key( d => d.year )
      .key( d => d.state_po )
      .key( d => d.party )
      .rollup( function ( v ) {
        return d3.sum( v, function ( d ) {
          return d.candidatevotes;
        } );
      } )
      .entries( data )
      .filter( d => d.key == year )[ 0 ].values;

    // console.log( 'year filtered :>> ', year );
    // console.log('filteredStateTotals :>> ', filteredStateTotals);
    let options = [];
    let names = [];

    filteredStateTotals.forEach( d => {
      names.push( nameByStatePO[ d.key ] );
      let sumEach = 0;
      let obj = {};
      // console.log('d :>> ', d.key);
      // console.log('all parties  :>> ', d.values);
      d.values.forEach( z => {
        // console.log('z :>> ', z);
        sumEach = sumEach + z.value;
      } );
      // console.log('sumEach :>> ', sumEach);
      // will use below keys as Table Headers
      obj[ "Republican" ] = d.values.filter( z => z.key == "republican" )[ 0 ].value / sumEach * 100;
      obj[ "Democrat" ] = d.values.filter( z => z.key == "democrat" )[ 0 ].value / sumEach * 100;
      obj[ "Others" ] = 100 - obj[ "Republican" ] - obj[ "Democrat" ];
      obj[ "NumOfSeats" ] = seatByStatePO[ d.key ];
      obj[ "PO" ] = d.key;
      //- options push each
      obj[ "imageSrc" ] = '/static/img/states/' + nameByStatePO[ d.key ].toLowerCase().replace( ' ', '-' ) + '-flag-small.png';
      obj[ "text" ] = `${nameByStatePO[ d.key ]}<em class="text-light opac-70 text-xs ml-1">@${slideYear}</em> `;
      obj[ "description" ] = `<em class="text-sm opac-80 mr-1">D</em> ${form4t( obj[ "Democrat" ] )}% <em class="text-sm opac-80 mr-1">R</em>${form4t( obj[ "Republican" ] )}% `,
        obj[ "value" ] = d.key;
      obj[ "selected" ] = false;
      options.push( obj );
    } );
    // console.log( 'options :>> ', options.map(d=>d.text) );
    // console.log('names :>> ', names);
    let result = {
      data: options,
      names: names
    };
    return result;
  }
  $( '#opts' ).ddslick( {
    data: genDDoptions( csvData, slideYear ).data,
    defaultSelectedIndex: 5,
    onSelected: function ( d, i ) {
      const stateName = genDDoptions( csvData, slideYear ).names[ d.selectedIndex ];
      console.log( 'stateName selected dropdown menu :>> ', stateName );
      init( stateName );
    }
  } );
}

function dropDownLite (defIndex) {
  // console.log('test drop down lite :>> ');
  function prepBasicMenu(){ 
    const result=[];  // generate dropdown menu with req'd keys
    const names =[];  // names req'd for init selected state flag

    Object.keys(seatsByState).forEach(k => {
      const name = k;
      names.push(name)
      result.push({
        text: name,
        // description: '',
        description: `Num of Seats: ${seatsByState[ k ]}`,
        value: name,
        selected: false,
        imageSrc: '/static/img/states/' + name.toLowerCase().replace( ' ', '-' ) + '-flag-small.png',
      })
      }
    )

    // console.log('defIndex :>> ', defIndex);
    return {data:result,names:names};
  }
  const basicMenuReady = prepBasicMenu();
  $( '#opts2' ).ddslick('destroy');
  $( '#opts2' ).ddslick( {
    data: basicMenuReady.data,
    defaultSelectedIndex: defIndex, 
    // truncateDescription: true,
    onSelected: function ( d, i ) {
      const stateName = basicMenuReady.names[ d.selectedIndex ];
      // console.log( 'stateName selected dropdown menu :>> ', stateName );
      // init( stateName );
      initAllFromDd( stateName );
    }
  } );
  
  //  document.body.style.backgroundImage = "url('../../imgimg_tree.png')"; 


  function initAllFromDd ( stateName ) {
    renderStateMain( prepStateMain( stateName ) );
    renderStateDemo( prepStateDemo( stateName ) );

    var cu = new counterUp( {
      start: 0,
      duration: 3000,
      intvalues: true,
      interval: 100,
      prepend: '€',
      append: '.00'
    } );
    cu.start();

    const url = '../static/data/csv/president.csv';
    d3.csv( url, function ( err, data ) {
      stateFocusMap( data, stateName );

      const dataReady = prepTimeSerData( data, stateName );
      barsPercUp( dataReady );
      barsCountUp( dataReady );
      timeSersPercUp( dataReady );
      gaugeUp( dataReady );
      updateImgTxt( stateName );
      // dropDownYearUp ( 2016, data );
      const stateIndex = indexNoBySt[ stateName ];
    } );
  }
}
// dropDownLite (5);

// js way of selecting an element
// select = document.getElementById("opts2");

// select.onchange = function () {
//   console.log('$select :>> ', $select.value);
// };

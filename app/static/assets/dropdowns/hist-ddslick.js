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
    }
  } );
  
  //  document.body.style.backgroundImage = "url('../../imgimg_tree.png')"; 


  function initAllFromDd ( stateName ) {

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

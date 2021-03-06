var counterDD = 0; // dont call init when default selection made
function dropdownMini  (defIndex) {// dropdown for interactive
  // console.log('test drop down lite :>> ');
  function prepBasicMenu(){ 
    const result=[];  // generate dropdown menu with req'd keys
    const names =[];  // names req'd for init selected state flag

    Object.keys(seatsByState).forEach(k => {
      let name = k;
      names.push(name)
      result.push({
        text: name,
        // description: '',
        description: `Electoral Votes: ${seatsByState[ name ]}`,
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
      if (counterDD == 0) {
        // console.log('-dropdown default selection ' );
      } else {
        initAllFromDd( stateName );
      }
      counterDD = counterDD +1;
    }
  } );
  
  //  document.body.style.backgroundImage = "url('../../imgimg_tree.png')"; 
  function initAllFromDd ( stateName ) {
    const url = '../static/data/csv/president.csv';
    d3.csv( url, function ( err, data ) {
      console.log(' init from dropdown :>> ');
      const dataReady = prepInteractiveData( data, stateName );
      // import csv once then render by input within the func
      main(dataReady);
      // import csv once then render by input within the func
      
    } );
  }
}

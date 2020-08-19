$(document).ready(function () {
        
        var manuf_select = document.getElementById("manufacturer");
        var item_select = document.getElementById("item");
        var $listAvailable = document.getElementById("available-items-list");
        // try with static data (2)
        console.log('-------------- STATIC --------------')

        function selectBlack(item) {
          return item.description == 'Black';
        }
        var ddDataFiltered = ddData.filter(selectBlack);
        // instructor ex.(1)
        function selectYounger(person) {
          return person.selected == false;
        }
        var youngSimpsons = simpsons.filter(selectYounger);
        console.log('simpsons')
        console.log(simpsons);
        console.log('simpsonsFiltered')
        console.log(youngSimpsons);
        // try filtering static data-works!
        console.log('ddData')
        console.log(ddData);
        console.log('ddDataFiltered')
        console.log(ddDataFiltered);
        // end of static -----------

        var jsonItems = []
        manuf_select.onchange = function () {
          console.log('-------------- FETCH --------------')

          manufacturer = manuf_select.value;

          // try with dynamic data (3) 
          var url = '/fetch/ddslick/' + manufacturer;
          console.log('url to fetch data for dynamic field')
          console.log(url)

          var jsondata;
          fetch(url).then(
            function (u) {
              return u.json();
            }
          ).then(
            function (json) {
              jsondata = json;

              console.log('jsondata fetched')
              console.log(jsondata)
              console.log(jsondata.items)
              jsonItems = jsondata.items;
              console.log('jsondata.items')
              console.log(jsonItems)

              var optionHTML = '';
              for (var item of jsondata.items) {
                optionHTML +=
                  '<li =" ' +
                  item.value + ' ">' +
                  item.text + '-' +
                  item.description + '-' +
                  '</li>';
              }

              $listAvailable.innerHTML = optionHTML;
            }
          )
          // original selectField that creates option tags w/o JQRY
          fetch('/fetch/ddslick/' + manufacturer)
            .then(function (response) {

              response.json().then(function (data) {
                var optionHTML = '';
                for (var item of data.items) {
                  optionHTML +=
                    '<option value=" ' +
                    item.value + ' ">' +
                    item.text + '-' +
                    item.description + '-' +
                    '</option>';
                }

                item_select.innerHTML = optionHTML;
              })

            });

        }

        // JQUERY PLUGIN DEMO EX NO 4
        $('#demoSetSelected').ddslick({
          data: ddDataFiltered,
          selectText: "Select your favorite social network",
          defaultSelectedIndex: 2
        });
        $('#btnSetSelected').on('click', function () {
          var i = $('#setIndex').val();
          if (i >= 0 && i < 96)
            $('#demoSetSelected').ddslick('select', {
              index: i
            });
          else
            $('#setIndexMsg').effect('highlight', 2400);
        });

        $('#manufSelect').ddslick({
          data: ddManuf,
          width: 300,
          imagePosition: "left",
          selectText: "Select your favorite social network",
          defaultSelectedIndex: 0,
          onSelected: function (data) {
            console.log(data);
            console.log('-------------- FETCH ddSlick --------------')
            var jsondata;
            var jsonItems = []
            manufacturer = data.selectedData.value;
            // modified, try with dynamic data (3) 
            var url = '/fetch/ddslick/' + manufacturer;
            console.log('url to fetch data for dynamic field \n' + url)
            fetch(url).then(
              function (u) {
                return u.json();
              }
            ).then(
              function (json) {
                jsondata = json;
                jsonItems = jsondata.items;
                console.log('jsondata.items')
                console.log(jsonItems)

                $('#itemSelect').ddslick('destroy');
                $('#itemSelect').ddslick({
                  data: jsonItems,
                  width: 200,
                  height: 128,
                  onSelected: function (data) {
                    console.log(data)
                  }
                });
              }
            )
          }
        });

        $("#image_folder_select").change(function () {
          console.log('-------------- FETCH ddSlick --------------')
          var jsondata;
          var jsonItems = []
          acturer = image_folder_select.value;
          // modified, try with dynamic data (3) 
          var url = '/fetch/ddslick/' + manufacturer;
          console.log('url to fetch data for dynamic field \n' + url)
          fetch(url).then(
            function (u) {
              return u.json();
            }
          ).then(
            function (json) {
              jsondata = json;
              jsonItems = jsondata.items;
              console.log('jsondata.items')
              console.log(jsonItems)

              $('#image_select').ddslick('destroy');
              $('#image_select').ddslick({
                data: jsonItems,
                width: 200,
                height: 128,
                onSelected: function (data) {
                  console.log(data)
                }
              });
            }
          )
        });
        // test part####################################################




  
    

        // this is for the page not to refresh etc. never delete
        //####################################################
      });
      
function bubbleMeUp() {
  Plotly.d3.json('/itemattr/bubble/1', function (error, data) {
    if (error)
      return console.warn(error);
    // Create the Trace
    var trace1 = {
      x: data[0]["x"],
      y: data[0]["y"],
      mode: 'markers',
      marker: {
        size: data[0]["y"],
        sizemode: 'diameter',
        color: 'rgba(190, 47, 195, 0.631);',
        opacity: 0.99,
        sizeref: 0.8,
        line: {
          color: '#268BD2',
          width: 2
        }
      }
    };
    var layout = {
      plot_bgcolor: "#002B36",
      paper_bgcolor: "#002B36",
      showlegend: false,
      responsive: true,
      margin: {
        t: 12
      },
      padding: 1,
      type: "bar",
      responsive: true,
      xaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
        },
        showgrid: true,
        zeroline: false,
        showline: false,
        mirror: 'ticks',
        gridcolor: '#073642',
        gridwidth: 0.05,
        zerolinecolor: '#002B36',
        zerolinewidth: 0.25,
        linecolor: '#B58900',
        linewidth: 0.25,
      },
      yaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
        },
        showgrid: true,
        zeroline: false,
        showline: false,
        mirror: 'ticks',
        gridcolor: '#073642',
        gridwidth: 0.05,
        zerolinecolor: '#002B36',
        zerolinewidth: 0.25,
        linecolor: '#B58900',
        linewidth: 0.25,
      },
    };
    var data = [trace1];
    var $bubble = document.getElementById('item-bubble');
    Plotly.newPlot($bubble, data, layout);
  });
}


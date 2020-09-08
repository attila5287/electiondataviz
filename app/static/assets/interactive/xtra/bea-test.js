d3.json(urlTest, function(err, json) {
  // console.log('chk err? :>> ', err);
  let defNm = "Colorado"; // default name for time series
  const showFirst = (list) =>list[0];
  const showLast = (list) =>list[list.length-1];
  // console.log('bea api services JSON format :>> ', json);
  let results = json.BEAAPI.Results;
  // console.log('results :>> ', results);
  
  let statsName = json.BEAAPI.Results.Statistic;
  // console.log('statsName :>> ', statsName);

  let statsLongNm = json.BEAAPI.Results.PublicTable;
  // console.log('statsLongNm :>> ', statsLongNm);

  let data = json.BEAAPI.Results.Data;
  // console.log('data :>> ', data[data.length-1]);
 
  let filtered = data.filter(d=> d.GeoName == defNm); 
  // console.log('filtered by name :>> ', filtered[filtered.length-1]);
  
  let arr = []; // 

  filtered.forEach(r => {// obj.s w/ {year/value} fields
    arr.push({
      // name: r.GeoName,
      year: +r.TimePeriod,
      value: +r.DataValue,
    });
  });

  let firstYear = +arr[0].year;
  // console.log('first :>> ', firstYear  );
  
  let lastYear = +arr[arr.length-1].year;
  // console.log('last :>> ', lastYear  );

  // yearSelectStart( firstYear);
  // yearSelectEnd(lastYear);
});


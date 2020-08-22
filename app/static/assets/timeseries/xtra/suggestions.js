function suggestionsUp(data){
  // console.log('data :>> ', data);

  
  var r = d3.nest()
      .key(d => d.state)
      .entries(data.filter(d => d.year == 2016 && d.party == 'republican'));
  var d = d3.nest()
      .key(d => d.state)
      .entries(data.filter(d => d.year == 2016 &&  d.party == 'democrat'));


  let margins ={};
  let grp01 = {}; // states with fewer than 5%
  let grp02 = {}; // states with fewer than 5%
  const abs = x => Math.round(Math.abs(x));
  
  for (let i = 0; i < r.length; i++) {
    let st = r[i].key; // state name
    let rx = r[i].values[0].candidatevotes; // rep votes
    let dx = d[i].values[0].candidatevotes; // dem votes
    let to = r[i].values[0].votes; // total

    margins[st] = abs((dx-rx)/to*10000)/100;

    if (margins[st] < 3.00) {
      grp01[st] = abs((dx-rx)/to*10000)/100;
    }
    
    else if (margins[st] < 10.00) {
      grp02[st] = abs((dx-rx)/to*10000)/100;
    }


  }

  console.log('margins :>> ', margins);
  console.log('grp01 :>> ', grp01);
  console.log('five :>> ', grp02);
  console.log('grp01 :>> ', Object.keys(grp01));
  console.log('grp02 :>> ', Object.keys(grp02));
  // console.log('margins :>> ', margins.sort((a, b) => a - b));

}

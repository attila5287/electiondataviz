var eleVoByYr={e1976d: 53.9,e1976r: 44.6,e1980d: 9.1,e1980r: 90.9,e1984d: 2.4,e1984r: 97.6,e1988d: 20.1,e1988r: 79.2,e1992d: 68.8,e1992r: 31.2,e1996d: 70.4,e1996r: 29.6,e2000d: 49.4,e2000r: 50.4,e2004d: 46.7,e2004r: 53.2,e2008d: 67.8,e2008r: 32.2,e2012d: 61.7,e2012r: 38.3,e2016d: 42.2,e2016r: 56.5};

// console.log('eleVoByYr :>> ', eleVoByYr);

var prezCandsByYr = {
  p1976r: "Ford, Gerald",
  p1980r: "Reagan, Ronald",
  p1984r: "Reagan, Ronald",
  p1988r: "Bush, George H.W.",
  p1992r: "Bush, George H.W.",
  p1996r: "Dole, Robert",
  p2000r: "Bush, George W.",
  p2004r: "Bush, George W.",
  p2008r: "McCain, John",
  p2012r: "Romney, Mitt",
  p2016r: "Trump, Donald J.",
  p1976d: "Carter, Jimmy",
  p1980d: "Carter, Jimmy",
  p1984d: "Mondale, Walter",
  p1988d: "Dukakis, Michael",
  p1992d: "Clinton, Bill",
  p1996d: "Clinton, Bill",
  p2000d: "Gore, Al",
  p2004d: "Kerry, John",
  p2008d: "Obama, Barack H.",
  p2012d: "Obama, Barack H.",
  p2016d: "Clinton, Hillary"
};

// console.log('prezCandsByYr :>> ', prezCandsByYr);

var indexNoBySt = {
  Alabama: 0,
  Alaska: 1,
  Arizona: 2,
  Arkansas: 3,
  California: 4,
  Colorado: 5,
  Connecticut: 6,
  Delaware: 7,
  "District of Columbia": 8,
  Florida: 9,
  Georgia: 10,
  Hawaii: 11,
  Idaho: 12,
  Illinois: 13,
  Indiana: 14,
  Iowa: 15,
  Kansas: 16,
  Kentucky: 17,
  Louisiana: 18,
  Maine: 19,
  Maryland: 20,
  Massachusetts: 21,
  Michigan: 22,
  Minnesota: 23,
  Mississippi: 24,
  Missouri: 25,
  Montana: 26,
  Nebraska: 27,
  Nevada: 28,
  "New Hampshire": 29,
  "New Jersey": 30,
  "New Mexico": 31,
  "New York": 32,
  "North Carolina": 33,
  "North Dakota": 34,
  Ohio: 35,
  Oklahoma: 36,
  Oregon: 37,
  Pennsylvania: 38,
  "Rhode Island": 39,
  "South Carolina": 40,
  "South Dakota": 41,
  Tennessee: 42,
  Texas: 43,
  Utah: 44,
  Vermont: 45,
  Virginia: 46,
  Washington: 47,
  "West Virginia": 48,
  Wisconsin: 49,
  Wyoming: 50
};
// console.log('indexByState :>> ', indexNoBySt);

var diversityPart2 = {
  Alabama:  {
    black: 26.7,
    asian: 1.3,
    native: 0.5
  },
  Alaska:  {
    black: 2.9,
    asian: 6.6,
    native: 14.2
  },
  Arizona:  {
    black: 4.1,
    asian: 3.2,
    native: 3.9
  },
  Arkansas:  {
    black: 15.2,
    asian: 1.6,
    native: 0.6
  },
  California:  {
    black: 5.5,
    asian: 14.4,
    native: 0.4
  },
  Colorado:  {
    black: 3.9,
    asian: 3.1,
    native: 0.6
  },
  Connecticut:  {
    black: 9.9,
    asian: 4.5,
    native: 0.2
  },
  Delaware:  {
    black: 21.5,
    asian: 4,
    native: 0.2
  },
  "District of Columbia":  {
    black: 45.3,
    asian: 4,
    native: 0.2
  },
  Florida:  {
    black: 15.4,
    asian: 2.8,
    native: 0.2
  },
  Georgia:  {
    black: 31.1,
    asian: 3.9,
    native: 0.2
  },
  Hawaii:  {
    black: 1.6,
    asian: 37.3,
    native: 0.1
  },
  Idaho:  {
    black: 0.6,
    asian: 1.3,
    native: 1.1
  },
  Illinois:  {
    black: 14,
    asian: 5.4,
    native: 0.1
  },
  Indiana:  {
    black: 9.2,
    asian: 2.2,
    native: 0.1
  },
  Iowa:  {
    black: 3.3,
    asian: 2.6,
    native: 0.2
  },
  Kansas:  {
    black: 5.5,
    asian: 2.9,
    native: 0.6
  },
  Kentucky:  {
    black: 8,
    asian: 1.4,
    native: 0.2
  },
  Louisiana:  {
    black: 32.1,
    asian: 1.8,
    native: 0.5
  },
  Maine:  {
    black: 1.2,
    asian: 1.1,
    native: 0.6
  },
  Maryland:  {
    black: 29.4,
    asian: 6.4,
    native: 0.2
  },
  Massachusetts:  {
    black: 7,
    asian: 6.6,
    native: 0.1
  },
  Michigan:  {
    black: 13.6,
    asian: 3.1,
    native: 0.5
  },
  Minnesota:  {
    black: 6.4,
    asian: 4.9,
    native: 1
  },
  Mississippi:  {
    black: 37.9,
    asian: 0.9,
    native: 0.4
  },
  Missouri:  {
    black: 11.4,
    asian: 2,
    native: 0.3
  },
  Montana:  {
    black: 0.4,
    asian: 0.7,
    native: 5.9
  },
  Nebraska:  {
    black: 4.5,
    asian: 2.4,
    native: 0.7
  },
  Nevada:  {
    black: 8.9,
    asian: 8.3,
    native: 0.9
  },
  "New Hampshire":  {
    black: 1.3,
    asian: 2.7,
    native: 0.1
  },
  "New Jersey":  {
    black: 12.8,
    asian: 9.8,
    native: 0.1
  },
  "New Mexico":  {
    black: 1.8,
    asian: 1.3,
    native: 8.8
  },
  "New York":  {
    black: 14.3,
    asian: 8.7,
    native: 0.2
  },
  "North Carolina":  {
    black: 21.2,
    asian: 2.9,
    native: 1.1
  },
  "North Dakota":  {
    black: 3,
    asian: 1.7,
    native: 5.4
  },
  Ohio:  {
    black: 12.2,
    asian: 2.2,
    native: 0.2
  },
  Oklahoma:  {
    black: 7.2,
    asian: 2.1,
    native: 7.3
  },
  Oregon:  {
    black: 1.8,
    asian: 4.3,
    native: 0.9
  },
  Pennsylvania:  {
    black: 10.7,
    asian: 3.5,
    native: 0.1
  },
  "Rhode Island":  {
    black: 5.4,
    asian: 3.6,
    native: 0.3
  },
  "South Carolina":  {
    black: 26.8,
    asian: 1.5,
    native: 0.2
  },
  "South Dakota":  {
    black: 1.9,
    asian: 1.2,
    native: 8.6
  },
  Tennessee:  {
    black: 16.6,
    asian: 1.8,
    native: 0.2
  },
  Texas:  {
    black: 11.8,
    asian: 4.8,
    native: 0.3
  },
  Utah:  {
    black: 1.2,
    asian: 2.4,
    native: 1
  },
  Vermont:  {
    black: 1.2,
    asian: 1.8,
    native: 0.3
  },
  Virginia:  {
    black: 18.8,
    asian: 6.4,
    native: 0.2
  },
  Washington:  {
    black: 3.5,
    asian: 8.5,
    native: 1
  },
  "West Virginia":  {
    black: 3.9,
    asian: 0.8,
    native: 0.1
  },
  Wisconsin:  {
    black: 6.3,
    asian: 2.7,
    native: 0.8
  },
  Wyoming:  {
    black: 0.9,
    asian: 0.8,
    native: 2.1
  },
};

// console.log('diversityPart2 :>> ', diversityPart2);
// console.log('diversityPart2 :>> ', diversityPart2["Colorado"]);

var diversityPart1 = {
  Alabama: {
    white: 65.5,
    minTotal: 34.5,
    hisp: 4.1
  },
  Alaska: {
    white: 60.6,
    minTotal: 39.4,
    hisp: 7
  },
  Arizona: {
    white: 54.7,
    minTotal: 45.3,
    hisp: 31.4
  },
  Arkansas: {
    white: 72.3,
    minTotal: 27.7,
    hisp: 7.4
  },
  California: {
    white: 37,
    minTotal: 63,
    hisp: 39.1
  },
  Colorado: {
    white: 68.2,
    minTotal: 31.8,
    hisp: 21.5
  },
  Connecticut: {
    white: 66.7,
    minTotal: 33.3,
    hisp: 16.1
  },
  Delaware: {
    white: 62.2,
    minTotal: 37.8,
    hisp: 9.3
  },
  "District of Columbia": {
    white: 36.5,
    minTotal: 63.5,
    hisp: 11
  },
  Florida: {
    white: 53.8,
    minTotal: 46.2,
    hisp: 25.6
  },
  Georgia: {
    white: 52.6,
    minTotal: 47.4,
    hisp: 9.6
  },
  Hawaii: {
    white: 21.8,
    minTotal: 78.2,
    hisp: 10.5
  },
  Idaho: {
    white: 82,
    minTotal: 18,
    hisp: 12.4
  },
  Illinois: {
    white: 61.2,
    minTotal: 38.8,
    hisp: 17.2
  },
  Indiana: {
    white: 79.2,
    minTotal: 20.8,
    hisp: 6.9
  },
  Iowa: {
    white: 85.9,
    minTotal: 14.1,
    hisp: 5.9
  },
  Kansas: {
    white: 75.9,
    minTotal: 24.1,
    hisp: 11.9
  },
  Kentucky: {
    white: 84.6,
    minTotal: 15.4,
    hisp: 3.5
  },
  Louisiana: {
    white: 58.5,
    minTotal: 41.5,
    hisp: 5.2
  },
  Maine: {
    white: 93.4,
    minTotal: 6.6,
    hisp: 1.6
  },
  Maryland: {
    white: 50.7,
    minTotal: 49.3,
    hisp: 10.1
  },
  Massachusetts: {
    white: 71.5,
    minTotal: 28.5,
    hisp: 11.8
  },
  Michigan: {
    white: 75,
    minTotal: 25,
    hisp: 5.1
  },
  Minnesota: {
    white: 79.9,
    minTotal: 20.1,
    hisp: 5.3
  },
  Mississippi: {
    white: 56.6,
    minTotal: 43.4,
    hisp: 2.9
  },
  Missouri: {
    white: 79.4,
    minTotal: 20.6,
    hisp: 4.2
  },
  Montana: {
    white: 86.3,
    minTotal: 13.7,
    hisp: 3.7
  },
  Nebraska: {
    white: 79,
    minTotal: 21,
    hisp: 10.9
  },
  Nevada: {
    white: 48.8,
    minTotal: 51.2,
    hisp: 28.8
  },
  "New Hampshire": {
    white: 90.3,
    minTotal: 9.7,
    hisp: 3.8
  },
  "New Jersey": {
    white: 54.8,
    minTotal: 45.2,
    hisp: 20.4
  },
  "New Mexico": {
    white: 37.4,
    minTotal: 62.6,
    hisp: 48.8
  },
  "New York": {
    white: 55.1,
    minTotal: 44.9,
    hisp: 19.2
  },
  "North Carolina": {
    white: 63,
    minTotal: 37,
    hisp: 9.4
  },
  "North Dakota": {
    white: 84.4,
    minTotal: 15.6,
    hisp: 3.5
  },
  Ohio: {
    white: 78.9,
    minTotal: 21.1,
    hisp: 3.7
  },
  Oklahoma: {
    white: 65.6,
    minTotal: 34.4,
    hisp: 10.6
  },
  Oregon: {
    white: 75.6,
    minTotal: 24.4,
    hisp: 13.1
  },
  Pennsylvania: {
    white: 76.4,
    minTotal: 23.6,
    hisp: 7.3
  },
  "Rhode Island": {
    white: 72.1,
    minTotal: 27.9,
    hisp: 15.4
  },
  "South Carolina": {
    white: 63.6,
    minTotal: 36.4,
    hisp: 5.7
  },
  "South Dakota": {
    white: 82.3,
    minTotal: 17.7,
    hisp: 3.6
  },
  Tennessee: {
    white: 73.9,
    minTotal: 26.1,
    hisp: 5.4
  },
  Texas: {
    white: 41.9,
    minTotal: 58.1,
    hisp: 39.4
  },
  Utah: {
    white: 78.3,
    minTotal: 21.7,
    hisp: 14
  },
  Vermont: {
    white: 92.8,
    minTotal: 7.2,
    hisp: 1.9
  },
  Virginia: {
    white: 61.7,
    minTotal: 38.3,
    hisp: 9.3
  },
  Washington: {
    white: 68.6,
    minTotal: 31.4,
    hisp: 12.7
  },
  "West Virginia": {
    white: 92,
    minTotal: 8,
    hisp: 1.3
  },
  Wisconsin: {
    white: 81.2,
    minTotal: 18.8,
    hisp: 6.9
  },
  Wyoming: {
    white: 84,
    minTotal: 16,
    hisp: 10
  },
};
// console.log('diversityPart1 :>> ', diversityPart1);
// console.log('diversityPart1 :>> ', diversityPart1);

var medAgeBySt = {
  Alabama: 4864680,
  Alaska: 738516,
  Arizona: 6946680,
  Arkansas: 2990670,
  California: 39148800,
  Colorado: 5531140,
  Connecticut: 3581500,
  Delaware: 949495,
  "District of Columbia": 684498,
  Florida: 20598100,
  Georgia: 10297500,
  Hawaii: 1422030,
  Idaho: 1687810,
  Illinois: 12821500,
  Indiana: 6637430,
  Iowa: 3132500,
  Kansas: 2908780,
  Kentucky: 4440200,
  Louisiana: 4663620,
  Maine: 1332810,
  Maryland: 6003440,
  Massachusetts: 6830190,
  Michigan: 9957490,
  Minnesota: 5527360,
  Mississippi: 2988760,
  Missouri: 6090060,
  Montana: 1041730,
  Nebraska: 1904760,
  Nevada: 2922850,
  "New Hampshire": 1343620,
  "New Jersey": 8881840,
  "New Mexico": 2092430,
  "New York": 19618500,
  "North Carolina": 10155600,
  "North Dakota": 752201,
  Ohio: 11641900,
  Oklahoma: 3918140,
  Oregon: 4081940,
  Pennsylvania: 12791200,
  "Puerto Rico": 3386940,
  "Rhode Island": 1056610,
  "South Carolina": 4955920,
  "South Dakota": 864289,
  Tennessee: 6651090,
  Texas: 27885200,
  Utah: 3045350,
  Vermont: 624977,
  Virginia: 8413770,
  Washington: 7294340,
  "West Virginia": 1829050,
  Wisconsin: 5778390,
  Wyoming: 581836
};

// console.log('medAgeBySt :>> ', medAgeBySt);

var over18PercBySt = {
  Alabama: "77.8",
  Alaska: "75.4",
  Arizona: "77.5",
  Arkansas: "76.8",
  California: "77.5",
  Colorado: "78.1",
  Connecticut: "79.6",
  Delaware: "79.1",
  "District of Columbia": "81.8",
  Florida: "80.3",
  Georgia: "76.4",
  Hawaii: "78.8",
  Idaho: "74.9",
  Illinois: "77.8",
  Indiana: "76.7",
  Iowa: "77",
  Kansas: "76",
  Kentucky: "77.6",
  Louisiana: "76.6",
  Maine: "81.5",
  Maryland: "77.9",
  Massachusetts: "80.4",
  Michigan: "78.5",
  Minnesota: "76.9",
  Mississippi: "76.5",
  Missouri: "77.7",
  Montana: "78.6",
  Nebraska: "75.4",
  Nevada: "77.5",
  "New Hampshire": "81.2",
  "New Jersey": "78.2",
  "New Mexico": "77.3",
  "New York": "79.3",
  "North Carolina": "78.1",
  "North Dakota": "76.4",
  Ohio: "77.9",
  Oklahoma: "75.9",
  Oregon: "79.5",
  Pennsylvania: "79.4",
  "Rhode Island": "80.7",
  "South Carolina": "78.4",
  "South Dakota": "75.5",
  Tennessee: "77.9",
  Texas: "74.5",
  Utah: "71",
  Vermont: "81.7",
  Virginia: "78.2",
  Washington: "78.2",
  "West Virginia": "79.9",
  Wisconsin: "78.2",
  Wyoming: "76.9"
};
// console.log('over18PercBySt :>> ', over18PercBySt);

// console.log('over18PercBySt :>> ', over18PercBySt['Colorado']);

var populationBySt = {
  Alabama: "4903185",
  Alaska: "731545",
  Arizona: "7278717",
  Arkansas: "3017804",
  California: "39512223",
  Colorado: "5758736",
  Connecticut: "3565287",
  Delaware: "973764",
  "District of Columbia": "705749",
  Florida: "21477737",
  Georgia: "10617423",
  Hawaii: "1415872",
  Idaho: "1787065",
  Illinois: "12671821",
  Indiana: "6732219",
  Iowa: "3155070",
  Kansas: "2913314",
  Kentucky: "4467673",
  Louisiana: "4648794",
  Maine: "1344212",
  Maryland: "6045680",
  Massachusetts: "6892503",
  Michigan: "9986857",
  Minnesota: "5639632",
  Mississippi: "2976149",
  Missouri: "6137428",
  Montana: "1068778",
  Nebraska: "1934408",
  Nevada: "3080156",
  "New Hampshire": "1359711",
  "New Jersey": "8882190",
  "New Mexico": "2096829",
  "New York": "19453561",
  "North Carolina": "10488084",
  "North Dakota": "762062",
  Ohio: "11689100",
  Oklahoma: "3956971",
  Oregon: "4217737",
  Pennsylvania: "12801989",
  "Rhode Island": "1059361",
  "South Carolina": "5148714",
  "South Dakota": "884659",
  Tennessee: "6829174",
  Texas: "28995881",
  Utah: "3205958",
  Vermont: "623989",
  Virginia: "8535519",
  Washington: "7614893",
  "West Virginia": "1792147",
  Wisconsin: "5822434",
  Wyoming: "578759",
};

// console.log('popu :>> ', populationBySt);
// console.log('popu :>> ', populationBySt['Colorado']);

var minWageBySt = {
  Alabama: 7.25,
  Alaska: 10.19,
  Arizona: 12,
  Arkansas: 10,
  California: 13,
  Colorado: 12,
  Connecticut: 11,
  Delaware: 9.25,
  Florida: 8.56,
  Georgia: 5.15,
  Hawaii: 10.1,
  Idaho: 7.25,
  Illinois: 10,
  Indiana: 7.25,
  Iowa: 7.25,
  Kansas: 7.25,
  Kentucky: 7.25,
  Louisiana: 7.25,
  Maine: 12,
  Maryland: 11,
  Massachusetts: 12.75,
  Michigan: 9.65,
  Minnesota: 10,
  Mississippi: 7.25,
  Missouri: 9.45,
  Montana: 8.65,
  Nebraska: 9,
  Nevada: 8,
  "New Hampshire": 7.25,
  "New Jersey": 11,
  "New Mexico": 9,
  "New York": 11.8,
  "North Carolina": 7.25,
  "North Dakota": 7.25,
  Ohio: 8.7,
  Oklahoma: 7.25,
  Oregon: 11.5,
  Pennsylvania: 7.25,
  "Rhode Island": 10.5,
  "South Carolina": 7.25,
  "South Dakota": 9.3,
  Tennessee: 7.25,
  Texas: 7.25,
  Utah: 7.25,
  Vermont: 10.96,
  Virginia: 7.25,
  Washington: 13.5,
  "Washington D.C.": 15,
  "West Virginia": 8.75,
  Wisconsin: 7.25,
  Wyoming: 5.15
};

// console.log('minWageBySt :>> ', minWageBySt['Colorado']);

var medAgeBySt = {
  Alabama: 38.9,
  Alaska: 34,
  Arizona: 37.4,
  Arkansas: 37.9,
  California: 36.3,
  Colorado: 36.6,
  Connecticut: 40.8,
  Delaware: 40.2,
  "District of Columbia": 33.9,
  Florida: 41.9,
  Georgia: 36.5,
  Hawaii: 38.9,
  Idaho: 36.1,
  Illinois: 37.9,
  Indiana: 37.6,
  Iowa: 38.1,
  Kansas: 36.5,
  Kentucky: 38.7,
  Louisiana: 36.6,
  Maine: 44.6,
  Maryland: 38.6,
  Massachusetts: 39.4,
  Michigan: 39.7,
  Minnesota: 37.9,
  Mississippi: 37.2,
  Missouri: 38.5,
  Montana: 39.8,
  Nebraska: 36.4,
  Nevada: 37.9,
  "New Hampshire": 42.7,
  "New Jersey": 39.8,
  "New Mexico": 37.5,
  "New York": 38.7,
  "North Carolina": 38.6,
  "North Dakota": 35.1,
  Ohio: 39.3,
  Oklahoma: 36.4,
  Oregon: 39.2,
  Pennsylvania: 40.7,
  "Puerto Rico": 40.9,
  "Rhode Island": 39.9,
  "South Carolina": 39.2,
  "South Dakota": 36.8,
  Tennessee: 38.7,
  Texas: 34.4,
  Utah: 30.7,
  Vermont: 42.9,
  Virginia: 38.1,
  Washington: 37.6,
  "West Virginia": 42.4,
  Wisconsin: 39.3,
  Wyoming: 37.3
};
// console.log('medAgeBySt :>> ', medAgeBySt);
// console.log('medAgeBySt :>> ', medAgeBySt['Colorado']);

var medianHHIbySt = {
  Alabama: 49936,
  Alaska: 68734,
  Arizona: 62283,
  Arkansas: 49781,
  California: 70489,
  Colorado: 73034,
  Connecticut: 72812,
  "D.C.": 85750,
  Delaware: 65012,
  Florida: 54644,
  Georgia: 55821,
  Hawaii: 80108,
  Idaho: 58728,
  Illinois: 70145,
  Indiana: 59892,
  Iowa: 68718,
  Kansas: 63938,
  Kentucky: 54555,
  Louisiana: 49973,
  Maine: 58663,
  Maryland: 86223,
  Massachusetts: 86345,
  Michigan: 60449,
  Minnesota: 71817,
  Mississippi: 42781,
  Missouri: 61726,
  Montana: 57679,
  Nebraska: 67575,
  Nevada: 61864,
  "New Hampshire": 81346,
  "New Jersey": 74176,
  "New Mexico": 48283,
  "New York": 67274,
  "North Carolina": 53369,
  "North Dakota": 66505,
  Ohio: 61633,
  Oklahoma: 54434,
  Oregon: 69165,
  Pennsylvania: 64524,
  "Rhode Island": 62266,
  "South Carolina": 57444,
  "South Dakota": 59463,
  Tennessee: 56060,
  Texas: 59785,
  "United States": 63179,
  Utah: 77067,
  Vermont: 70066,
  Virginia: 77151,
  Washington: 79726,
  "West Virginia": 50573,
  Wisconsin: 62629,
  Wyoming: 62539

};
// console.log('dict :>> ', medianHHIbySt["Colorado"]);


// state postal code as key pairing full state name:CO-Colorado
var nameByStatePO = {
  "AK": "Alaska",
  "AL": "Alabama",
  "AR": "Arkansas",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DC": "District of Columbia",
  "DE": "Delaware",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "IA": "Iowa",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "MA": "Massachusetts",
  "MD": "Maryland",
  "ME": "Maine",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MO": "Missouri",
  "MP": "N Mariana Is",
  "MS": "Mississippi",
  "MT": "Montana",
  "NC": "N Carolina",
  "ND": "N Dakota",
  "NE": "Nebraska",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NV": "Nevada",
  "NY": "New York",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "S Carolina",
  "SD": "S Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VA": "Virginia",
  "VI": "Virgin Islands",
  "VT": "Vermont",
  "WA": "Washington",
  "WI": "Wisconsin",
  "WV": "W Virginia",
  "WY": "Wyoming"
};

// value is the state seat count, key is state name: Colorado
var seatsByState ={"Alabama ": 9,"Alaska ": 3,"Arizona ": 11,"Arkansas ": 6,"California ": 55,"Colorado ": 9,"Connecticut ": 7,"Delaware ": 3,"District of Columbia": 3,"Florida ": 29,"Georgia ": 16,"Hawaii ": 4,"Idaho ": 4,"Illinois ": 20,"Indiana ": 11,"Iowa ": 6,"Kansas ": 6,"Kentucky ": 8,"Louisiana ": 8,"Maine ": 4,"Maryland ": 10,"Massachusetts ": 11,"Michigan ": 16,"Minnesota ": 10,"Mississippi ": 6,"Missouri ": 10,"Montana ": 3,"Nebraska ": 5,"Nevada ": 6,"New Hampshire ": 4,"New Jersey ": 14,"New Mexico ": 5,"New York ": 29,"North Carolina ": 15,"North Dakota ": 3,"Ohio ": 18,"Oklahoma ": 7,"Oregon ": 7,"Pennsylvania ": 20,"Rhode Island ": 4,"South Carolina ": 9,"South Dakota ": 3,"Tennessee ": 11,"Texas ": 38,"Utah ": 6,"Vermont ": 3,"Virginia ": 13,"Washington ": 12,"West Virginia ": 5,"Wisconsin ": 10,"Wyoming ": 3};

// console.log('test nameByStatePO :>> ', nameByStatePO);

// Calculation Of Dictionary for  state seat by state postal 
// ex: key CO pairs 7 | modify: 0 for states with no seat
// -------------------------------------------------------
// var seatByStatePO = {};
// // state_po is the state postal code provided on MIT dataset
// let sumCheckTotal = 0;  
// Object.keys(nameByStatePO).forEach(PO =>{
  //   if (seatsByState[nameByStatePO[PO]] == undefined) {
    //     // req'd for those without a seat like DC or Am.Samoa
    //     seatByStatePO[PO] = 0;
    //   } else { // for all states with seat
    //     seatByStatePO[PO] = seatsByState[nameByStatePO[PO]];
    //   }
    //   sumCheckTotal = sumCheckTotal + seatsByState[nameByStatePO[PO]];
    // });
    // console.log('sumCheckTotal needs 435 :>> ', sumCheckTotal);
    // console.log(' *** final *** seatByStatePO :>> ', seatByStatePO);
    // -------------------------------------------------------

var seatByStatePO = {
  "AK": 1,
  "AL": 7,
  "AR": 4,
  "AS": 0,
  "AZ": 9,
  "CA": 53,
  "CO": 7,
  "CT": 5,
  "DC": 0,
  "DE": 1,
  "FL": 27,
  "GA": 14,
  "GU": 0,
  "HI": 2,
  "IA": 4,
  "ID": 2,
  "IL": 18,
  "IN": 9,
  "KS": 4,
  "KY": 6,
  "LA": 6,
  "MA": 9,
  "MD": 8,
  "ME": 2,
  "MI": 14,
  "MN": 8,
  "MO": 8,
  "MP": 0,
  "MS": 4,
  "MT": 1,
  "NC": 13,
  "ND": 1,
  "NE": 3,
  "NH": 2,
  "NJ": 12,
  "NM": 3,
  "NV": 4,
  "NY": 27,
  "OH": 16,
  "OK": 5,
  "OR": 5,
  "PA": 18,
  "PR": 0,
  "RI": 2,
  "SC": 7,
  "SD": 1,
  "TN": 9,
  "TX": 36,
  "UT": 4,
  "VA": 11,
  "VI": 0,
  "VT": 1,
  "WA": 10,
  "WI": 8,
  "WV": 3,
  "WY": 1,
};

// console.log( 'test seatByStatePO copy paste for all:>> ', seatByStatePO );

// console.log( 'test seatByStatePO for Colorado:>> ', seatByStatePO[ "CO" ] );

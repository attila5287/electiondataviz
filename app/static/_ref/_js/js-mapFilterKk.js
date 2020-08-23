console.log(data);

// find()
let founded = null;

// founded = data.find(item => (item._id = "5e652aa642281be3552ea326"));

founded = data.find(item => item.age > 30);
// console.log(founded);

// findIndex()

// founded = data.findIndex(item => {
//     return true/false
// })

founded = data.findIndex(item => item._id == "5e652aa60875b58090c2bdc1");
// console.log(founded);

// indexOf()

let newArr = [
  "Gokhan",
  "Kandemir",
  "Defne",
  "Handan",
  "Kamil",
  "Felakettin",
  1,
  2,
  3,
  4,
  5
];
founded = newArr.indexOf(1);
founded = newArr.indexOf(1, 9);
// console.log(founded);

// filter()
founded = data.filter(item => {
  //   let ...
  // kodlamalariniz..
  return item.age > 30 && item.eyeColor == "blue" && item.gender == "female";
});

// map()
founded = data.map(item => item);
founded = data.map(item => item.email);
founded = data.map(item => {
  return {
    eposta_adresi: item.email,
    sirket_adi: item.company
  };
});

// Gokhan Kandemir (Telefon numaram) Adres : ...founded.

founded = data.map(item => {
  //   return item.name + "[" + item.phone + "]" + item.address;
  return `${item.name} [ ${item.phone} ] => Address : ${item.address}`;
});

founded = data.map(item => {
  return {
    lat: item.latitude,
    long: item.longitude
  };
});
// console.log(founded);

// forEach...
// find(), findIndex()

// data.forEach(item => {
//   if (item.age > 30) {
//     console.log("item", item);
//   }
// });

for (let i = 0; i <= data.length - 1; i++) {
  if (data[i].age > 30) {
    // console.log("item", data[i], i);
    break;
  }
}

// filter()

let filtered = [];
data.forEach(item => {
  // console.log("item", item);
  if (item.age > 30) {
    filtered.push(item);
  }
});
// console.log("filtered", filtered);

// map()

filtered = [];
data.forEach(item => {
  // console.log("item", item);
  filtered.push({
    name: item.name,
    phone: item.phone
  });
});

filtered = data.map(item => {
  return {
    name: item.name,
    phone: item.phone
  };
});

// DB istekleri... Servisin gereksinimleri..
// name, email, phone, age, lat, long, friends
let willSaveData = data
  .filter(i => i.name <= 20)
  .map(item => {
    return {
      name: item.name,
      email: item.email,
      phone: item.phone,
      age: item.age,
      lat: item.latitude,
      long: item.longitude,
      picture: item.picture,
      friends: item.friends.map(f => f.name)
    };
  });
// console.log("willSaveData", willSaveData);

// .reduce()

// [1,2,3,4,5,6]
// [{}, {}, {}, {}]

// toplam..
let ageSum = data.reduce((sum, item) => sum + item.age, 0);
// console.log("ageSum", ageSum);

// .some()
let result = data.some(item => item.gender == "female" && item.age > 25);

// .every()
// result = data.every(item => item.hasOwnProperty("isActive"));
result = data.every(item => item.age > 10);
// console.log("REsult", result);

let name = "Gokhan Kandemir";
// startsWith()
console.log(name.startsWith("Gok"));
// endsWith()
console.log(name.endsWith("mir"));

let persons = [
  {
    name: "Gokhan",
    fv_1: "Field 1",
    fv_2: "Field 2"
  },
  {
    name: "Defne",
    fv_1: "Field 11",
    fv_2: "Field 21",
    fv_3: "Field 31"
  },
  {
    name: "Handan",
    fv_1: "Field 12",
    fv_3: "Field 32"
  }
];

let final_persons = persons.map(item => {
  Object.keys(item).forEach(key => {
    if (!key.startsWith("fv_")) {
      delete item[key]; // delete item.name
    }
  });
  return item;
});

// console.log("final_persons", final_persons);

// .flat()
let myArray = [1, 2, 3, 4, 5, [6, 7], [8, 9, [10, 11, [12, 13, [14, 15]]]]];
console.log(myArray.flat(Infinity));
z

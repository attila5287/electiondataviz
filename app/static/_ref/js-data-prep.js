/*
ES6 CONST/LET EXAMPLES
*/
// 1. Example of Scoping difference. Using "var", the variable is declared at the top of the scope, but initialized with a value at the line it was typed. It is given a value of "undefined" until it is initialized with it's actual value. By comparison, Let/Const are defined and initialized on the same line.
// using var
function logger() {
  // returns "undefined", but code still runs.
  console.log(x);
  var x = "hi";
}
logger();

// using let
function logger2() {
  // ReferenceError: y is not defined. Code will stop execution.
  console.log(y);
  let y = "hello";
}
// logger2();

// to demo stop of execution
function logger3() {
  var z = "this will never print";
  // Doesn't print since logger2 function stops execution.
  console.log(z);
}
logger3();


// 2. Example of const for constant value

// this value is constant, and will refuse attempts at re-assignment.
const myPets = ["dog", "cat", "rabbit", "some endangered species of sea turtle"];

// myPets = "ferret"; //This will not work - stops execution

// myPets = ["wolf", "giraffe", "parrot"]; //This will not work either

// HOWEVER, we can still manipulate Objects and Arrays!
console.log("before: ", myPets);
myPets.pop();

console.log("after: ", myPets);

// 3a. forEach - basic
function printOne(number) {
  console.log(number);
}

var arr = [1, 2, 3, 4, 5];

// call a function on each item in the array
arr.forEach(printOne);

// 3b. forEach with index
function printWithIndex(number, index) {
  console.log(index, number);
}

arr.forEach(printWithIndex);


// 4. map - functional programming

const theStagesOfJS = ["confidence", "sadness", "confusion", "realization", "debugging", "satisfaction"];

const mapReturn1 = theStagesOfJS.map(function(item) {
  return item;
});

console.log(mapReturn1);

const mapReturn2 = theStagesOfJS.map(function(item, index) {
  return `Stage ${index + 1}: ${item}`;
});

console.log(mapReturn2);

// Note: The original array is unchanged
console.log(theStagesOfJS);


// 5. map vs forEach

// a.
const stages1 = theStagesOfJS.forEach(function(each, index) {
  // the return of forEach is ignored
  return `Stage ${index + 1}: ${each}`;
});

// undefined
console.log(stages1);

// unaltered
console.log(theStagesOfJS);

// b.
theStagesOfJS.forEach(function(each, index) {
  // you have to mutate the orignal array with forEach
  theStagesOfJS[index] = `Stage ${index + 1}: ${each}`;
});

// note that the original array has been altered (mutated)
console.log(theStagesOfJS);

// c.
var bestActors = [
  { name: "Nic Cage", age: 54, knownFor: "Con Air" },
  { name: "Keanu Reeves", age: 53, knownFor: "The Matrix" },
  { name: "Betty White", age: 96, knownFor: "Lake Placid" },
  { name: "Patrick Warburton", age: 53, knownFor: "The Tick" }
];

const knownFor = bestActors.map(function(actor) {
  return actor.knownFor;
});

console.log(knownFor);


// 6. Arrow Functions

// a.
// Function Expression
var multiply1 = function(a, b) {
  return a * b;
};

/* eslint-disable */

// Arrow Function Expression
var multiply2 = (a, b) => {
  return a * b;
};

/* eslint-enable */

// 6 - called the same way as usual
multiply2(2, 3);

// Arrow Function Expression - concise
  // without curly brackets, the return statement is implied
var multiply3 = (a, b) => a * b;

// can omit the parenthesis if there's only a single parameter
var square = x => x * x;

// b.
var princesses = [
  { name: "Rapunzel", age: 18 },
  { name: "Mulan", age: 16 },
  { name: "Anna", age: 18 },
  { name: "Moana", age: 16 }
];

// log the name of each princess, follow by a colon, followed by their age
// forEach: executes a provided function once for each array element
princesses.forEach(princess => console.log(`${princess.name}: ${princess.age}`));

// create an array of just the names from the princesses array
// map: creates a new array with the results of   ing a provided function on every element in the calling array
var names = princesses.map(princess => princess.name);
console.log("names: ", names);

// using the `names` array, get only those names that start with an 'M'
// filter: creates a new array with elements that pass the test of the provided function
var mNames = names.filter(name => name.startsWith("M"));
console.log("m-names: ", mNames);

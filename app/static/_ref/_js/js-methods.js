// JavaScript methods for working with strings and arrays

var randomString = "four score and seven years ago";

// Find a substring within a string
var four = randomString.indexOf("four");
var score = randomString.indexOf("score");
var years = randomString.indexOf("years");
console.log(four);
console.log(score);
console.log(years);

// Reverse a string
var myString = "!skcoR gnidoC";
// Break up myString into an array of letters

var myStringArray = myString.split("");
console.log(myStringArray);

// Reverse the order of letters in myStringArray
var reversedArray = myStringArray.reverse();
console.log(reversedArray);

// Join the letters of reversedArray into a string
var newString = reversedArray.join("");
console.log(newString);

// Remove (and add) elements from an array
var numArray = [11, 22, 33, 44, 55, 66, 77, 88, 99];

// At index position zero, remove one element
var firstSplice = numArray.splice(0, 1);
console.log(numArray);
console.log(firstSplice);

// Use splice() to add elements
var anotherArray = [11, 22, 33, 44, 55, 66, 77, 88, 99];

// At index zero, delete no elements, and add an element
var secondSplice = anotherArray.splice(0, 0, "There!");
console.log(secondSplice);
console.log(anotherArray);

// At index zero, delete no elements, and add two elements
var thirdSplice = anotherArray.splice(0, 0, "Why", "Hello");
console.log(anotherArray);
console.log(thirdSplice);

// An index zero, delete three existing elements and add an element
var deleteAndAdd = anotherArray.splice(0, 3, "Replacement string");
console.log(anotherArray);
console.log(deleteAndAdd);

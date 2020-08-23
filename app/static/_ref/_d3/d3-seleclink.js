// Select the text of an HTML element
var text1 = d3.select(".text1").text();
console.log("text1 says: " + text1);

var text2 = d3.select("#text2").text();
console.log("text2 says: " + text2);

// // Modify the text of an HTML element
// // Uncomment the line below to run it
d3.select(".text1").text("Hey, I changed this!")

// // Capture the HTML of a selection
var mylink = d3.select(".mylink").html();
console.log("mylink: " + mylink);

// // Select an element's child element
// // An object is returned
var mylinkAnchor = d3.select(".mylink>a");
console.log(mylinkAnchor);

// // // Capture the child element's href attribute
var mylinkAnchorAttribute = mylinkAnchor.attr("href");
console.log("mylinkAnchorAttribute: " + mylinkAnchorAttribute);

// // Change an element's attribute
// // Uncomment the line below
mylinkAnchor.attr("href", "https://python.org")

// // Use chaining to join methods
d3.select(".mylink>a").attr("href", "https://nytimes.org").text("Now this is a link to the NYT!!");

// // Select all list items, then change their font color 
d3.selectAll("li").style("color", "blue");

// // Create a new element
var $li1 = d3.select("ul").append("li");
$li1.text("A new item has been added!")

// //Use chaining to create a new element and set its text
var $li2 = d3.select("ul").append("li").text("Another new item!");
    


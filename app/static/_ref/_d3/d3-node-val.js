// This .on("click") function will trigger the AJAX Call
d3.select("#find-movie").on("click", function (event) {

    // d3.event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    d3.event.preventDefault();

    // Here we grab the text from the input box
    var movie = d3.select("#movie-input").node().value;

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=movies+" + movie +
        "&api_key=dc6zaTOxFJmzC&limit=10";
    d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);

        // console.log(response);
        console.log("url", response);
        var url = response.data[0].images.fixed_height.url;
        d3.select(".imgGoesHere").append("img").attr("src", url);
    })

});
 
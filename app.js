//Create preset of buttons
var tvShows = ["The Office", "Friends", "Seinfield", "Full House", "Family Matters"];

//Function to create buttons from array
var createButtons = function() {

    $("#buttons").html("");

    tvShows.forEach(function(tvShow) {
        
        var newButton = $("<button>");
        newButton.attr("data-gif", tvShow)
                .addClass("gif-button btn btn-default")
                .text(tvShow);
        
        $("#buttons").append(newButton);

    
    })
}

//Get value from input and store in variable
//Create button from input and store the value

$("#add-button").on("click", function(){

    event.preventDefault();

    var addButton = $("#new-button").val().trim();

    $("#new-button").val("");

    tvShows.push(addButton);
    createButtons();

    
})

//Create click event for each new button
//Use value of button to create a new giphy api call
//Return 10 gifs with the tag = to the value of the button

$(document.body).on("click", ".gif-button", function(){
    var tag = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0UeIhgVaDyxfRXnlriyJthFl1CFq93h5&q=" + tag + "&limit=10&rating=pg&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        $("#gifs").html("");
        
        var results = response.data;

        results.forEach(function(result){
            console.log(result);
            var rating = result.rating;
            var gifURL = result.images.fixed_height.url;
            var gifURLStill = result.images.fixed_height_still.url;
            // console.log(gifURL);

            var gif = $("<div>").addClass("gif-container col-md-4");

            var gifImage = $("<img>");
            gifImage.attr("data-image-still", gifURLStill)
                .attr("data-image-animate", gifURL)
                .attr("data-state", "still")
                .attr("src", gifURLStill)
                .addClass("giphy");
            
            var ratingText = $("<p>").text("Rating " + rating);

            gif.append(gifImage).append(ratingText);

            $("#gifs").append(gif);
        })
    })

    
})

$(document.body).on("click", ".giphy", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-image-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-image-still"));
        $(this).attr("data-state", "still");
    }
})

createButtons();
$(document).ready(function () {

    //Create array of starting search terms
    var reactions = ["awe", "awkwardness", "boredom", "confusion", "disgust", "envy", "excitement", "fear", "horror", "interest", "joy", "sadness", "satisfaction", "triumph"];


    function buttons() {

        //Clears out button div so that buttons won't dulplicate
        $("#buttons-go-here").empty();

        //Create buttons for elements in reactions array
        for (var j = 0; j < reactions.length; j++) {

            //Creating a button for each array element
            var newButtons = $("<button class='button btn btn-primary'>");

            //Giving each button a data attribute
            newButtons.attr("data-react", reactions[j]);

            //Giving the buttons corresponding text with the reactions elements
            newButtons.text(reactions[j]);

            //Appending the buttons to the page
            $("#buttons-go-here").append(newButtons);

        }
    }

    //Calling the buttons function
    buttons();

    //Create a click event to add new reactions to the array
    $("#submit").on("click", function (event) {

        event.preventDefault();

        var userInput = $("#user-input").val().trim();

        reactions.push(userInput);
        console.log(reactions);

        $("#user-input").val("");

        buttons();
    })

    //Create a function that will concatinate the user search term with the giphy api url
    $(document).on("click", ".button", function () {

        //Clears out gif div so that gifs won't dulplicate
        $("#gifs-go-here").empty();

        //Construct a URL
        var react = $(this).attr("data-react");
        console.log(react);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + react + "&api_key=UqXWOGF9JVGz0r6sKNVEWNiG2bbrBYfR&limit=10&offset=0&rating=PG-13&lang=en";

        //Perform an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            //Storing an array of results in results variable
            var results = response.data;

            //Looping through each gif in the AJAX array to get info
            for (var i = 0; i < results.length; i++) {

                //Creating a div for each
                var gifDiv = $("<div class='item'>");

                //Storing the rating data from AJAX in a variable
                var rating = results[i].rating;

                //Creating a variable to have the rating displayed
                var pRating = $("<p>").text("Rating: " + rating);

                //Creating an image tag and giving it a source
                var image = $("<img class='gif'>");

                //Creating variables for both paused and unpaused images
                var imageUrl = results[i].images.fixed_height.url;

                var imageStillUrl = results[i].images.fixed_height_still.url;

                //Adding needed attributes to gif URLs
                image.attr('src', imageStillUrl);
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);


                //Appending to the page 
                gifDiv.append(pRating, image);

                //Prepending each gif and rating pair
                $("#gifs-go-here").prepend(gifDiv);


            };

        });
        
    });

    //Create a click event to animate gifs
    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        };

    });

});
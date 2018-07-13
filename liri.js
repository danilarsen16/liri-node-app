require("dotenv").config();

var keys = require("./keys.js")
var inquirer = require("inquirer");
var request = require("request")
var command = process.argv[2]
var fs = require('fs');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var mediaString = "";

var omdbApi = require('omdb-client');
var omdb = require('omdb');




switch (command) {
    case "my-tweets":
        console.log("my tweets")
        getMyTweets()
        break;
    case "spotify-this-song":
        console.log("spotify")
        getSpotify()
        break;
    case "movie-this":
        console.log("omdb")
        movieThis(process.argv[3])
        break;
    case "do-what-it-says":
        console.log("./random.txt")
        doWhatItSays(process.argv[3])
        break;
    default:
        console.log("nothing")
}
console.log(keys.omdb)


//  twitter code //
function getMyTweets() {
    var client = new Twitter(keys.twitter);
    var tweeter = {
        screen_name: "Dani06396236",
        count: 20
    }
    client.get('statuses/user_timeline', tweeter, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                console.log("-------")
                console.log("Name: " + tweets[i].user.name);
                console.log("Tweet: " + tweets[i].text);
            }
        }
    });
}

//  spotify code //
function getSpotify() {
    var songName = process.argv[3]
    var params = {
        type: "track",
        query: songName
    }
    spotify.search(params, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items
        for (var i = 0; i < songs.length; i++) {

            console.log("-------")
            console.log("Name: " + songs[i].name)
            console.log("Artist: " + songs[i].artists[0].name)
            console.log("Preview Url: " + songs[i].preview_url)
            console.log("Album Name: " + songs[i].album.name)
        }
    });
}

function doWhatItSays() {

    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    });
}

    //  omdb code //
    function movieThis(movieName) {

        console.log(keys.omdb);

        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb, function (error, response, body) {

            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {

                console.log(body)
                console.log(JSON.parse(body));

                //Get the Movie ID
                var data = JSON.parse(body);
                var title = data.Title
                // console.log(movieID.imdbID);

                // Create new query using the movie ID
                // var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + omdbKey + "&append_to_response=credits,releases";

                // request(queryURL, function (error, response, body) {
                // var movieObj = JSON.parse(body);

                console.log("************************************");
                console.log("Title of the movie");
                console.log(title);
                console.log("____________________________________");

                console.log("Year the movie came out.");
                console.log(data.Year);
                console.log("____________________________________");

                console.log("IMDB Rating of the movie.");
                console.log(data.imdbRating);
                console.log("____________________________________");

                console.log("Rotten Tomatoes Rating of the movie.");
                console.log(data.Ratings[1]);
                console.log("____________________________________");

                console.log("Country where the movie was produced.");
                console.log(data.Country);
                console.log("____________________________________");

                console.log("Language of the movie.");
                console.log(data.Language);
                console.log("____________________________________");

                console.log("Plot of the movie.");
                console.log(data.Plot);
                console.log("____________________________________");

                console.log("Actors in the movie.");
                console.log(data.Actors);
                console.log("____________________________________");

                // }

                // });


            } else {
                console.log("Mr. Nobody");
            }

        });
    }

require("dotenv").config();
var keys = require("./assets/keys.js")

// console.log(process.argv)

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2]

// console.log(command)

switch (command) {
    case "my-tweets":
    getMyTweets()
    break;
    case "spotify":
    console.log("spotify")
    break;
    default:
    console.log("nothing")
}

function getMyTweets () {
    console.log("my-tweets")

}

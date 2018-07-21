//initialize dotenv
require("dotenv").config();

//imports API keys from keys.js
var keys = require("./keys.js");

//initialize node packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

//creates Spotify and Twitter objects with API keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var params = {
    //Twitter @ name. Change screen name to see different tweets
    screen_name: 'ProfPickles7'
};

//grabs command line inputs
var command = process.argv[2];
var title = process.argv[3];


//swtich-case for each command
switch (command) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        randomCmd();
        break;
};


//Twitter command. Grabs the last 20 tweets
function tweets() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("Tweet #" + (i + 1) + ") " + JSON.parse(response.body)[i].text);
            }
            return;
        }

        console.log(error);
    });
};



//Spotify command
function song() {
    spotify.search({ type: 'track', query: title, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artists: " + data.tracks.items[0].artists[0].name);
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
};


//OMDB command
function movie() {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + title, function (error, response, body) {
        if (error) {
            return console.log(error);
        }

        // console.log(JSON.parse(response.body));
        console.log("Title: " + JSON.parse(response.body).Title);
        console.log("Year Released: " + JSON.parse(response.body).Year);
        console.log("IMDB Rating: " + JSON.parse(response.body).imdbRating);
        console.log("Rotten Tomatoes: " + JSON.parse(response.body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(response.body).Country);
        console.log("Language: " + JSON.parse(response.body).Language);
        console.log("Plot: " + JSON.parse(response.body).Plot);
        console.log("Actors: " + JSON.parse(response.body).Actors);
    });
};


//fs command
function randomCmd() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        //adds the two texts inside an array
        var dataArr = data.split(",");

        //switch-case using the first array index as an input for 'command'
        switch (dataArr[0]) {
            case "my-tweets":
                tweets();
                break;

            case "spotify-this-song":
                title = dataArr[1];
                song();
                break;

            case "movie-this":
                title = dataArr[1];
                movie();
                break;
        }

    });
};
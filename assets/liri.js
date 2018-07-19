require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var params = {
    screen_name: 'ProfPickles7'
};

var command = process.argv[2];


//Twitter command
if (command === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for(var i = 0; i < 20; i++){
                console.log("Tweet #"+(i+1)+") "+JSON.parse(response.body)[i].text);
            }
            return;
        }

        console.log(error);
    });
}

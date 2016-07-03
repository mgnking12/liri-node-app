var keys = require('./keys.js');
var inquirer = require('inquirer');
var fs = require('fs');
inquirer.prompt([{
    type: "list",
    message: "Make a choice.",
    choices: ["Twitter", "Music", "Movies"],
    name: "action"
}]).then(function(answers) {

    switch (answers.action) {
        case 'Twitter':
            twitter();
            break;
        case 'Music':
            spotify();
            break;
        case 'Movies':
            movies();
            break;
    }
});

function twitter() {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys);
    var params = {
        screen_name: 'moostweets'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("The last 20 Tweets:")
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
                console.log("");
            }
        } else {
            console.log(error);
        }
    });
}

function spotify() {
    var spotify = require('spotify');
    var spotArr = [];

    inquirer.prompt([{
        type: "input",
        message: "What song?",
        name: "song"
    }]).then(function(answers) {
        spotify.search({
            type: 'track',
            query: answers.song,
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        });
    })
}

function movies() {
    inquirer.prompt([{
        type: "input",
        message: "What movie?",
        name: "movie"
    }]).then(function(answers) {
        var request = require('request');
        var movie = answers.movie;
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Title: " + JSON.parse(body)["Title"]);
                console.log("Year: " + JSON.parse(body)["Year"]);
                console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Actors: " + JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + " (" + JSON.parse(body)["tomatoURL"] + ")");
            }
        });
    });
}
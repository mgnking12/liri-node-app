var keys = require('./keys.js');
var command = process.argv[2];
var fs = require('fs');
var spotArr = [];
for (var i = 3; i < process.argv.length; i++) {
    spotArr.push(process.argv[i])
}

switch (command) {
    case 'my-tweets':
        twitter();
        break;
    case 'spotify-this-song':
        spotify();
        break;
}

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
    spotify.search({
        type: 'track',
        query: spotArr,
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
}
require("dotenv").config();

// Variables and requires
var command = process.argv[2];
var thing = process.argv[3];
var Twitter = require('twitter');
var params = {
  screen_name: 'springkles5',
  count: 20
};
var keys = require('./keys');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
var request = require('request');
var fs = require("fs");

//Switch break statement to direct to the next function the user wanted
switch (command) {
  case 'my-tweets':
    myTweets();
    break;
  case 'spotify-this-song':
    spotifyThis(thing);
    break;
  case 'movie-this':
    movieThis(thing);
    break;
  case 'do-what-it-says':
    random();
    break;
}

//Tweets
function myTweets() {
 
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        var number = i + 1;
        console.log('--------------------');
        console.log([i + 1] + '. ' + tweets[i].text);
        console.log('Tweeted on: ' + tweets[i].created_at);
        console.log('--------------------');
      }
  }
  });
}


//Spotify
function spotifyThis(thing) {
  
  if (thing == null) {
    thing = 'Illmatic';
  }
  spotify.search({ type: 'track', query: thing 
  }, function(error, data) {
      if (error) {
        console.log('Error occurred: ' + error);
        return;
    }
        console.log('--------------------');
        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
        console.log('Song Title: ' + data.tracks.items[0].name);
        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('--------------------');
});
}


//OMDB 
function movieThis(thing) {
 
  if (thing == null) {
    thing = 'Mr. Nobody';
  }
  request("http://www.omdbapi.com/?t="+thing+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('--------------------');
      console.log('Movie Title: ' + JSON.parse(body).Title);
      console.log('Release Year: ' + JSON.parse(body).Year);
      console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
      console.log('Country: ' + JSON.parse(body).Country);
      console.log('Language: ' + JSON.parse(body).Language);
      console.log('Plot: ' + JSON.parse(body).Plot);
      console.log('Lead Actors: ' + JSON.parse(body).Actors);
      console.log('--------------------');
  }
  });
}


function random() {
  
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    } else {
      spotifyThis(data[1]);
    }
  
  });
}
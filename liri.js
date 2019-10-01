var fs = require("fs");
var axios = require("axios");
var dotenv = require("dotenv").config();
var moment = require("moment");

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(process.argv);

var action = process.argv[2];
var query = process.argv[3];


function _concert(_query) {
    axios.get(`https://rest.bandsintown.com/artists/${_query}/events?app_id=codingbootcamp`)
        .then(function (res) {
            res.data.forEach(function (item) {
                console.log(`Venue: ${item.venue.name}`);
                console.log(`Location: ${item.venue.city} ${item.venue.region}`);
                var formatted = moment(item.datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
                //console.log(item.datetime);
                console.log(`Date and Time: ${formatted}\n`);
            });

        })
        .catch(function (err) {
            console.log(err);
        });
}

function _spotify(_query) {
    spotify.search({ type: 'track', query: _query })
        .then(function (res) {
            //console.log(response);
            res.tracks.items.forEach(function (item) {
                console.log(`Artist: ${item.artists[0].name}`);
                console.log(`Song name: ${item.name}`);
                console.log(`Preview link: ${item.external_urls.spotify}`);
                console.log(`Album: ${item.album.name}\n`);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

function _movie(_query) {
    axios.get(`http://www.omdbapi.com/?t=${_query}&y=&plot=short&apikey=trilogy`)
        .then(function (res) {
            //console.log(res.data);
            console.log(`Title: ${res.data.Title}`);
            console.log(`Year: ${res.data.Year}`);
            console.log(`IMDB Rating: ${res.data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${res.data.Ratings[1].Value}`);
            console.log(`Country Produced: ${res.data.Country}`);
            console.log(`Language: ${res.data.Language}`);
            console.log(`Plot: ${res.data.Plot}`);
            console.log(`Actors: ${res.data.Actors}\n`);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        //console.log(data);

        var dataArr = data.split(",");
console.log(dataArr);
        // We will then re-display the content as an array for later use.
        route(dataArr[0], dataArr[1]);

    });
}

function route(_action, _query) {
    switch (_action) {
        case "concert-this":
            _concert(_query);
            break;
        case "spotify-this-song":
            _spotify(_query);
            break;
        case "movie-this":
            _movie(_query);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Action not recognized.");
    }
}

route(action, query);
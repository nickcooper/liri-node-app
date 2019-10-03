// includes
var fs = require("fs");
var axios = require("axios");
var dotenv = require("dotenv").config();
var moment = require("moment");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// parse command line arguements
var action = process.argv[2];
var query = process.argv.slice(3).join(" ");

// Log to file helper function
function logIt(data) {
    fs.appendFile("./log.txt", data, function (err) {
        if (err) { throw err }
    })
}

// get concert info function
function _concert(_query) {
    if (!_query) {
        _query = "Celine Dion";
    }
    axios.get(`https://rest.bandsintown.com/artists/${_query}/events?app_id=codingbootcamp`)
        .then(function (res) {
            var output = `############\nConcert results for: ${_query}\n`;
            res.data.forEach(function (item) {
                var formatted = moment(item.datetime).format("MM/DD/YYYY");
                output += `Venue: ${item.venue.name}\nLocation: ${item.venue.city} ${item.venue.region}\nDate and Time: ${formatted}\n\n`;
            });

            console.log(output);
            logIt(output);

        })
        .catch(function (err) {
            console.log(err);
        });
}

// get spotify info function
function _spotify(_query) {
    if (!_query) {
        _query = "The Sign";
    }
    spotify.search({ type: 'track', query: _query })
        .then(function (res) {
            var output = `############\nSong results for: ${_query}\n`;
            res.tracks.items.forEach(function (item) {
                output += `Artist: ${item.artists[0].name}\nSong name: ${item.name}\nPreview link: ${item.external_urls.spotify}\nAlbum: ${item.album.name}\n\n`;
            });

            console.log(output);
            logIt(output);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// get movie info function
function _movie(_query) {
    if (!_query) {
        _query = "Mr. Nobody";
    }
    axios.get(`http://www.omdbapi.com/?t=${_query}&y=&plot=short&apikey=trilogy`)
        .then(function (res) {
            var output = `############\nMovie results for: ${_query}\n`;
            output += `Title: ${res.data.Title}\nYear: ${res.data.Year}\nIMDB Rating: ${res.data.imdbRating}\nRotten Tomatoes Rating: ${res.data.Ratings[1].Value}\nCountry Produced: ${res.data.Country}\nLanguage: ${res.data.Language}\nPlot: ${res.data.Plot}\nActors: ${res.data.Actors}\n\n`;

            console.log(output);
            logIt(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// read from file and to it function
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        // We will then re-display the content as an array for later use.
        routeMe(dataArr[0], dataArr[1]);

    });
}

// router function
function routeMe(_action, _query) {
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

routeMe(action, query);
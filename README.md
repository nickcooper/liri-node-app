# LIRI Bot 
(Language Interpretation and Recognition Interface)

## Purpose
LIRI is a command line app that allows you to search infomation on concerts, songs, and movies

## Overview
LIRI uses [Bands in Town](https://www.bandsintown.com/) for concert info, [Spotify](https://www.spotify.com) for song info, and [OMDB](https://www.omdbapi.com) for movie info.

## How to use

### Concert this
Use the following format:
```sh
$ node liri.js concert-this <band-name>
```
![Concert this](images/concert.gif)

### Spotify this
Use the following format:
```sh
$ node liri.js spotify-this-song <song-name>
```
![Spotify this](images/spotify.gif)

### Movie this
Use the following format:
```sh
$ node liri.js movie-this <movie-name>
```
![Movie this](images/movie.gif)

### Do what it says
Reads the local file random.txt and parses the command from it.

### Technologies Used
* npm node modules:
    * axios
    * dotenv
    * moment
* APIs:
    * node-spotify-api
    * bands in town rest api
    * omdb api
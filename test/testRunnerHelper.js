require('../models/token')();
require('../models/artist')();
require('../models/album')();
require('../models/track')();
require('../models/event')();
require('../models/genre')();
require('../models/news')();
require('../models/video')();

var mongoose = require('mongoose');
var config = require('config');

var conn = mongoose.createConnection(config.get('db_uri'));
var Token = conn.model('Token');
var Album = conn.model('Album');
var Artist = conn.model('Artist');
var Track = conn.model('Track');
var Event = conn.model('Event');
var Genre = conn.model('Genre');
var News = conn.model('News');
var Video = conn.model('Video');

module.exports = {

    init:function() {
        conn = mongoose.createConnection(config.get('db_uri'));
    },

    createToken:function createToken(){
        var token = new Token({
            value: Math.random().toString(10).substr(2, 5),
            createdAt: new Date()
        });
        token.save();

        return token.value;
    },

    createArtist:function createArtist(name){
        var artist = new Artist({
            artistName: name
        });
        artist.save();

        return artist;
    },

    createTrack: function createTrack(name){
        var track = new Track({
            artists:[{artistName:name}],
            songTitle:"testTrackTitle"
        });
        track.save();

        return track;
    },

    createAlbum:function createAlbum(name) {
        var album = new Album({
            title: 'testAlbumTitle',
            genres:[{genreName:'testGenre'}],
            artists:[{artistName:name}]
        });
        album.save();

        return album;
    },

    createEvent: function createEvent(name) {
        var event = new Event({
            date:createFormattedDate(),
            title:'testEventTitle',
            venue:'testEventVenue',
            city:'testEventCity',
            artists:[{artistName:name}]
        });
        event.save();

        return event;
    },

    createNews: function createNews() {
        var news = new News({
            title:'testNewsTitle',
            date:createFormattedDate()
        });
        news.save();

        return news;
    },

    createGenre:function createGenre() {
        var genre = new Genre({
            genreName: 'Jazz',
            subGenres: [{genreName: 'Latin Jazz'}]
        });
        genre.save();

        return genre;
    },

    createVideo:function createVideo(name) {
        var video = new Video({
            artists:[{artistName:name}]
        });
        video.save();

        return video;
    },

    dropAllCollections: function dropAllCollections(){
        Token.remove({}, function(err) {if(err) throw err;});
        Album.remove({}, function(err) {if(err) throw err;});
        Artist.remove({}, function(err) {if (err) throw err;});
        Track.remove({}, function(err) {if (err) throw err;});
        Event.remove({}, function(err) {if (err) throw err;});
        News.remove({}, function(err) {if (err) throw err;});
        Video.remove({}, function(err) {if (err) throw err;});
        Genre.remove({}, function(err) {if (err) throw err;});
    },

    createDataForEndpoint: function createData(endpoint) {

        switch (endpoint) {
            case 'album':
                var artist = this.createArtist('Yoda');
                return {album:this.createAlbum(artist.artistName),artist:artist};
            case 'artist':
                return {artist:this.createArtist('Chewbacca')};
            case 'track':
                var artist =  this.createArtist('Darth Vader');
                return {track:this.createTrack(artist.artistName),artist:artist};
            case 'event':
                var artist = this.createArtist('Padmé');
                return {event:this.createEvent(artist.artistName), artist:artist};
            case 'news':
                return {news:this.createNews()};
            case 'video':
                var artist = this.createArtist('C-3PO');
                return {video:this.createVideo(artist.artistName), artist:artist};
            case 'genre':
                return {genre:this.createGenre()};
            default:
                break;
        }
    }
};

function createFormattedDate(){
    var currentDate = new Date();
    return currentDate.getDay() + '-' + '' + currentDate.getMonth() + '-' + currentDate.getFullYear();
}

function generateToken(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16)
}
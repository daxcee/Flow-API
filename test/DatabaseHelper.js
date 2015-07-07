require('../models/token')();
require('../models/artist')();
require('../models/album')();
require('../models/track')();

var tokenGen = require('../utils/tokenGenerator');
var mongoose = require('mongoose');
var config = require('config');

var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
var Token = conn.model('Token');
var Album = conn.model('Album');
var Artist = conn.model('Artist');
var Track = conn.model('Track');

module.exports = {

    createToken:function createToken(){
        var token = new Token( {
            value: tokenGen.modules.generateToken(),
            createdAt: new Date(),
            recipient:name
        });
        token.save();

        return token;
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

    createEvent: function createEvent() {
        return null;
    },

    createNews: function createEvent() {
        return null;
    },

    createGenre:function createEvent() {
        return null
    },

    dropAllCollections: function dropAllCollections(){
        Token.remove({}, function(err) {
            if(err)
                throw err;
        });
        Album.remove({}, function(err) {
            if(err)
                throw err;
        });
        Artist.remove({}, function(err) {
            if (err)
                throw err;
        });

        Track.remove({}, function(err) {
            if (err)
                throw err;
        });
    },

    createDateForEndpoint: function createData(endpoint) {
        switch (endpoint) {
            case 'album':
                var artist = this.createArtist('Yoda');
                return {album:this.createAlbum(artist.artistName),artist:artist};

            case 'artist':
                return {artist:this.createArtist('Chewbacca')};

            case 'track':
                var artist =  this.createArtist('Darth Vader');
                return {track:this.createTrack(artist.artistName),artist:artist};

            default:
                break;
        }
    }
};

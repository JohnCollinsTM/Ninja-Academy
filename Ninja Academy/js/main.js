/// <reference path="..\typings\index.d.ts" />

/*globals Phaser*/

var gameState = {
    //Executed at the beginning
    //Used to load images and audio
    preload: function() {  

    },

    //Used to set up the game, display sprites, etc.
    create: function() {

    },

    //Called 60 times per second and contains the game's logic
    //Used to update game states, update sprites, read keyboard and mouse clicks
    update: function() {

    },
};

//Creates a WIDTH x HEIGHT game
var game = new Phaser.Game(1280, 720);

game.state.add('gameState', gameState);

game.state.start();
/// <reference path="..\typings\index.d.ts" />

/*globals Phaser*/

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//Executed at the beginning
//Used to load images and audio
function preload() {
    game.load.image('background', '..\content\images\map-main-background\background-half-hd.jpg');
}

//Used to set up the game, display sprites, etc.
function create() {
    game.add.sprite(0, 0, 'background');
}

//Called 60 times per second and contains the game's logic
//Used to update game states, update sprites, read keyboard and mouse clicks
function update() {
}

game.state.start();
/// <reference path="..\..\typings\index.d.ts" />

/// <reference path="player.js" />

/// <reference path="platforms.js" />

/*globals Phaser, platforms, maleNinja*/

"use strict";

(function () {
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    let keyState;

    function preload() {
        game.load.image('background', 'content/background-half-hd.jpg');

        game.load.image('ground', 'content/platform.png');

        game.load.atlasJSONHash(
            'ninjarun',
            'content/ninjarun.png',
            'content/ninjarun.json');
    }

    function create() {
        //  enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        // set physics to true
        platforms.enableBody = true;

        // create ground platform
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);

        ground.body.immovable = true;

        //  platforms
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // The player and its settings
        maleNinja = game.add.sprite(0, 0, 'ninjarun');

        //  We need to enable physics on the player
        game.physics.arcade.enable(maleNinja);

        //  Player physics properties. Give the little guy a slight bounce.
        maleNinja.body.bounce.y = 0.2;
        maleNinja.body.gravity.y = 300;
        maleNinja.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        maleNinja.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
        maleNinja.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);

        //  Our controls.
        keyState = game.input.keyboard.createCursorKeys();
    }

    function update() {
        game.physics.arcade.collide(maleNinja, platforms);
        maleNinja.body.velocity.x = 0;

        if (keyState.left.isDown) {

            maleNinja.body.velocity.x = -150;

            maleNinja.animations.play('left');
        }
        else if (keyState.right.isDown) {

            maleNinja.body.velocity.x = 150;

            maleNinja.animations.play('right');
        }
        else {
            //  stand still / idle
            maleNinja.animations.stop();

            maleNinja.frame = 4;
            // animation to be added
        }

        //  if touching ground, you can jump.
        if (keyState.up.isDown && maleNinja.body.touching.down) {
            maleNinja.body.velocity.y = -350;
        }
    }
} ());
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
        game.load.image('background', '../../content/images/forest-background.png');

        game.load.image('ground', '../../content/images/tiles/graveyard-map-tiles/Tile (2).png');

        game.load.image('left-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (14).png');
        game.load.image('ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (15).png');
        game.load.image('right-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (16).png');

        game.load.image('skull', '../../content/images/tiles/graveyard-map-tiles/Bones (2).png');
        game.load.image('bones', '../../content/images/tiles/graveyard-map-tiles/Bones (3).png');

        game.load.atlasJSONHash(
            'ninjarun',
            'content/ninjarun.png',
            'content/ninjarun.json');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'background');

        platforms = game.add.group();

        // set physics to true
        platforms.enableBody = true;

        // create ground platform
        for (var i = 0; i < 10; i += 1) {
            var ground = platforms.create(
                i * 100, 
                game.world.height - 130, 
                'ground');

            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
        }

        //  platforms
        let ledge = platforms.create(350, 250, 'ledge');
        ledge.scale.setTo(1, 0.5);
        ledge.body.immovable = true;

        let rightLedge = platforms.create(450 , 250, 'right-ledge');
        rightLedge.scale.setTo(1, 0.5);
        rightLedge.body.immovable = true;

        let leftLedge = platforms.create(250 , 250, 'left-ledge');
        leftLedge.scale.setTo(1, 0.5);
        leftLedge.body.immovable = true;

        let leftSideLedge = platforms.create(0, 350, 'right-ledge');
        leftSideLedge.scale.setTo(1, 0.5);
        leftSideLedge.body.immovable = true;

        leftSideLedge = platforms.create(675, 100, 'left-ledge');
        leftSideLedge.scale.setTo(1, 0.5);
        leftSideLedge.body.immovable = true;

        let rightSideLedge = platforms.create(675, 350, 'left-ledge');
        rightSideLedge.scale.setTo(1, 0.5);
        rightSideLedge.body.immovable = true;

        rightSideLedge = platforms.create(0, 100, 'right-ledge');
        rightSideLedge.scale.setTo(1, 0.5);
        rightSideLedge.body.immovable = true;

        // The player and its settings
        maleNinja = game.add.sprite(0, 250, 'ninjarun');
        maleNinja.scale.setTo(0.7, 0.7);

        //  We need to enable physics on the player
        game.physics.arcade.enable(maleNinja);

        //  Player physics properties. Give the little guy a slight bounce.
        maleNinja.body.bounce.y = 0.15;
        maleNinja.body.gravity.y = 500;
        maleNinja.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        maleNinja.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
        maleNinja.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);

        let skull = game.add.sprite(0, 450, 'skull');
        skull.scale.setTo(0.5, 0.5);

        let bones = game.add.sprite(640, 450, 'bones');
        bones.scale.setTo(0.5, 0.5);

        //  Our controls.
        keyState = game.input.keyboard.createCursorKeys();
    }

    function update() {
        game.physics.arcade.collide(maleNinja, platforms);
        maleNinja.body.velocity.x = 0;

        if (keyState.left.isDown) {

            maleNinja.body.velocity.x = -200;

            maleNinja.animations.play('left');
        }
        else if (keyState.right.isDown) {

            maleNinja.body.velocity.x = 200;

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
            maleNinja.body.velocity.y = -420;
        }
    }
} ());
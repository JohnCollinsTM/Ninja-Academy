/// <reference path="..\..\typings\index.d.ts" />

/// <reference path="player-male.js" />
/// <reference path="player-female.js"/>

/*globals Phaser, maleNinja, femaleNinja */
let femaleNinja;
(function() {
    'use strict';

    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    let keyState;
    let keyStateFemale;
    let platforms;

    //TODO:
    //must use game.load.audio instead of new Audio

    let maleJumpSound1 = new Audio('../../content/audio/sound-efx/male-jump-1.ogg');
    let maleJumpSound2 = new Audio('../../content/audio/sound-efx/male-jump-2.ogg');

    let backgroundSound = new Audio('../../content/audio/background-sound.wav');
    backgroundSound.volume = 0.4;
    backgroundSound.loop;
    backgroundSound.play();

    let swordAttack1 = new Audio('../../content/audio/sound-efx//sword-attack (1).wav');
    let swordAttack2 = new Audio('../../content/audio/sound-efx//sword-attack (2).wav');

    swordAttack1.volume = 0.7;
    swordAttack2.volume = 0.7;

    let step1 = new Audio('../../content/audio/sound-efx//step  (1).ogg');
    let step2 = new Audio('../../content/audio/sound-efx//step  (2).ogg');

    function startRunningSound() {
        let rndNumber = Math.round(Math.random());

        if (rndNumber === 0) {
            step1.play();
        } else {
            step2.play();
        }
    }

    function preload() {
        game.load.image('background', '../../content/images/forest-background.png');

        game.load.image('ground', '../../content/images/tiles/graveyard-map-tiles/Tile (2).png');

        game.load.image('left-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (14).png');
        game.load.image('ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (15).png');
        game.load.image('right-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (16).png');

        game.load.image('skull', '../../content/images/tiles/graveyard-map-tiles/Bones (2).png');
        game.load.image('bones', '../../content/images/tiles/graveyard-map-tiles/Bones (3).png');
        game.load.image('bush-one', '../../content/images/objects/graveyard-map-objects/Bush (1).png');
        game.load.image('bush-two', '../../content/images/objects/graveyard-map-objects/Bush (2).png');
        game.load.image('tree', '../../content/images/objects/graveyard-map-objects/Tree.png');
        game.load.image('dead-bush', '../../content/images/objects/graveyard-map-objects/DeadBush.png');
        game.load.image('skeleton', '../../content/images/objects/graveyard-map-objects/Skeleton.png');
        game.load.image('arrow-sign', '../../content/images/objects/graveyard-map-objects/ArrowSign.png');
        game.load.image('tomb-stone', '../../content/images/objects/graveyard-map-objects/TombStone (2).png');

        game.load.atlasJSONHash('female',
            'content/female-ninja/ninja.png',
            'content/female-ninja/ninja.json');

        game.load.atlasJSONHash(
            'ninjarun',
            'content/male-ninja/ninja.png',
            'content/male-ninja/ninja.json');
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
        let ledge = platforms.create(345, 150, 'ledge');
        ledge.scale.setTo(1, 0.5);
        ledge.body.immovable = true;

        let rightLedge = platforms.create(445, 150, 'right-ledge');
        rightLedge.scale.setTo(1, 0.5);
        rightLedge.body.immovable = true;

        let leftLedge = platforms.create(245, 150, 'left-ledge');
        leftLedge.scale.setTo(1, 0.5);
        leftLedge.body.immovable = true;

        let leftSideLedge = platforms.create(0, 300, 'right-ledge');
        leftSideLedge.scale.setTo(1, 0.5);
        leftSideLedge.body.immovable = true;

        leftSideLedge = platforms.create(725, 150, 'left-ledge');
        leftSideLedge.scale.setTo(1, 0.5);
        leftSideLedge.body.immovable = true;

        let rightSideLedge = platforms.create(675, 300, 'left-ledge');
        rightSideLedge.scale.setTo(1, 0.5);
        rightSideLedge.body.immovable = true;

        rightSideLedge = platforms.create(-55, 150, 'right-ledge');
        rightSideLedge.scale.setTo(1, 0.5);
        rightSideLedge.body.immovable = true;

        let bushOne = game.add.sprite(130, 410, 'bush-one');
        bushOne.scale.setTo(0.7, 0.7);

        let bushTwo = game.add.sprite(650, 410, 'bush-two');

        let skeleton = game.add.sprite(400, 110, 'skeleton');
        skeleton.scale.setTo(0.8, 0.8);

        let deadBush = game.add.sprite(720, 100, 'dead-bush');
        deadBush.scale.setTo(0.7, 0.7);

        let tombStone = game.add.sprite(-20, 405, 'tomb-stone');
        tombStone.scale.setTo(0.9, 0.9);

        let tree = platforms.create(300, 310, 'tree');
        tree.scale.setTo(0.7, 0.7);
        tree.body.immovable = true;
        // The player and its settings
        femaleNinja = game.add.sprite(0, 0, 'female');
        femaleNinja.scale.setTo(0.7, 0.7);

        maleNinja = game.add.sprite(0, 400, 'ninjarun');
        maleNinja.scale.setTo(0.7, 0.7);

        //  We need to enable physics on the player
        game.physics.arcade.enable(maleNinja);
        game.physics.arcade.enable(femaleNinja);

        //  Player physics properties. Give the little guy a slight bounce.
        maleNinja.body.bounce.y = 0.15;
        maleNinja.body.gravity.y = 500;
        maleNinja.body.collideWorldBounds = true;
        maleNinja.anchor.setTo(0.5);

        femaleNinja.body.bounce.y = 0.15;
        femaleNinja.body.gravity.y = 500;
        femaleNinja.body.collideWorldBounds = true;
        femaleNinja.anchor.setTo(0.5);



        //  Our two animations, walking left and right.
        maleNinja.animations.add('left', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
        maleNinja.animations.add('right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
        maleNinja.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);
        maleNinja.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
        maleNinja.animations.add('jump', [20, 21, 22, 23, 24, 25]);


        femaleNinja.animations.add('left', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
        femaleNinja.animations.add('right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
        femaleNinja.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);
        femaleNinja.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
        femaleNinja.animations.add('jump', [20, 21, 22, 23, 24, 25]);

        keyState = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            attack: this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1)
        };

        keyStateFemale = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            attack: this.input.keyboard.addKey(Phaser.Keyboard.H)
        };

        let skull = game.add.sprite(0, 450, 'skull');
        skull.scale.setTo(0.5, 0.5);

        let bones = game.add.sprite(640, 450, 'bones');
        bones.scale.setTo(0.5, 0.5);
    }

    function update() {
        game.physics.arcade.collide(maleNinja, platforms);
        game.physics.arcade.collide(femaleNinja, platforms);
        maleNinja.body.velocity.x = 0;
        femaleNinja.body.velocity.x = 0;

        function spriteControlsEngine(sprite, controls) {

            if (!sprite.body.touching.down) {
                if (controls.left.isDown) {
                    sprite.body.velocity.x = -150;
                    sprite.scale.setTo(-0.7, 0.7);
                } else if (controls.right.isDown) {
                    sprite.body.velocity.x = 150;
                    sprite.scale.setTo(0.7, 0.7);
                }
            } else if (controls.up.isDown) {

                sprite.animations.play('jump', 10, false);
            } else if (controls.left.isDown) {
                sprite.animations.play('left');
                sprite.body.velocity.x = -150;
                sprite.scale.setTo(-0.7, 0.7);
                startRunningSound();
            } else if (controls.attack.isDown) {

                sprite.animations.play('attack');

                let rndNumber = Math.round(Math.random());

                if (rndNumber === 0) {
                    swordAttack1.play();
                } else {
                    swordAttack2.play();
                }


            } else if (controls.right.isDown) {
                sprite.animations.play('right');
                sprite.body.velocity.x = 150;
                sprite.scale.setTo(0.7, 0.7);
                startRunningSound();
            } else {
                //  stand still / idle
                sprite.animations.play('idle');
                // animation to be added
            }

            //  if touching ground, you can jump.
            if (controls.up.isDown && sprite.body.touching.down) {
                let rndNumber = Math.round(Math.random());

                if (rndNumber === 0) {
                    maleJumpSound1.play();
                } else {
                    maleJumpSound2.play();
                }

                sprite.body.velocity.y = -420;
            }
        }

        spriteControlsEngine(maleNinja, keyState);
        spriteControlsEngine(femaleNinja, keyStateFemale)



    }
}());;

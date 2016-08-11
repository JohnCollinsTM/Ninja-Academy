/// <reference path="..\..\typings\index.d.ts" />

/* globals Phaser, define */

(function () {
    'use strict';

    define(['playerMale', 'playerFemale', 'audio', 'content'], function (playerMale, playerFemale, audio, content) {
        let game = new Phaser.Game(800, 600, Phaser.AUTO);

        let maleNinja = playerMale.ninja;
        let femaleNinja = playerFemale.ninja;

        let playerOneKeyState;
        let playerTwoKeyState;

        let platforms;

        let imgs = content.imgs;

        function generateObjects() {
            // Ground platform
            for (var i = 0; i < 10; i += 1) {
                var ground = platforms.create(
                    i * 100,
                    game.world.height - 130,
                    'ground');

                ground.scale.setTo(1, 1);
                ground.body.immovable = true;
            }

            // Physical objects 
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
        }

        function generateTiles() {
            // Non-physicical objects 
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

            let skull = game.add.sprite(0, 450, 'skull');
            skull.scale.setTo(0.5, 0.5);

            let bones = game.add.sprite(640, 450, 'bones');
            bones.scale.setTo(0.5, 0.5);
        }

        function updateTimer() {
            var me = this;

            var currentTime = new Date();
            var timeDifference = me.startTime.getTime() - currentTime.getTime();

            //Time elapsed in seconds
            me.timeElapsed = Math.abs(timeDifference / 1000);

            //Time remaining in seconds
            var timeRemaining = me.totalTime - me.timeElapsed;

            //Convert seconds into minutes and seconds
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining) - (60 * minutes);

            //Display minutes, add a 0 to the start if less than 10
            var result = (minutes < 10) ? "0" + minutes : minutes;

            //Display seconds, add a 0 to the start if less than 10
            result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

            me.timeLabel.text = result;
        }

        var gameState = {
            preload: function () {

                // Loading Images
                for (let i = 0, len = imgs.length; i < len; i += 2) {
                    let name = i;
                    let url = i + 1;
                    game.load.image(imgs[name], imgs[url]);
                }

                game.load.atlasJSONHash('female',
                    'content/female-ninja/ninja.png',
                    'content/female-ninja/ninja.json');

                game.load.atlasJSONHash(
                    'ninjarun',
                    'content/male-ninja/ninja.png',
                    'content/male-ninja/ninja.json');
            },

            create: function () {
                game.physics.startSystem(Phaser.Physics.ARCADE);

                game.add.sprite(0, 0, 'background');

                platforms = game.add.group();
                platforms.enableBody = true;

                generateObjects();
                generateTiles();

                // Health bars
                let bmd = this.game.add.bitmapData(300, 40);
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, 300, 80);
                bmd.ctx.fillStyle = '#00685e';
                bmd.ctx.fill();

                let backGroundOfMaleLife = this.game.add.sprite(180, 30, bmd);
                backGroundOfMaleLife.anchor.set(0.5);

                let backGroundOfFemaleLife = this.game.add.sprite(620, 30, bmd);
                backGroundOfFemaleLife.anchor.set(0.5);


                //this.actualMalehealth.crop(SOME_DAMEGE); AFter tha Calling a function

                bmd = this.game.add.bitmapData(280, 30);
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, 300, 80);
                bmd.ctx.fillStyle = '#00f910';
                bmd.ctx.fill();

                //this.totalLife = bmd.width;

                this.actualMaleHealth = this.game.add.sprite(180 - backGroundOfMaleLife.width / 2 + 10, 30, bmd);
                this.actualMaleHealth.anchor.y = 0.5;
                this.actualMaleHealth.cropEnabled = true;
                //this.actualMalehealth.crop(SOME_DAMEGE); AFter tha Calling a function

                this.actualFemaleHealth = this.game.add.sprite(620 - backGroundOfFemaleLife.width / 2 + 10, 30, bmd);
                this.actualFemaleHealth.anchor.y = 0.5;
                this.actualFemaleHealth.cropEnabled = true;

                let maleHead = game.add.sprite(0, 5, 'male-Head');
                maleHead.scale.setTo(0.8, 0.8);

                let femaleHead = game.add.sprite(750, 5, 'female-Head');
                femaleHead.scale.setTo(0.7, 0.7);

                // Timer
                var time = this;

                time.startTime = new Date();
                time.totalTime = 120;
                time.timeElapsed = 0;


                time.timeLabel = time.game.add.text(400, 6, "00:00", { font: "50px Arial", fill: "#FFFF00" });
                time.timeLabel.anchor.setTo(0.5, 0);
                time.timeLabel.align = 'center';

                time.gameTimer = game.time.events.loop(100, function () {
                    time.updateTimer();
                });


                //Female ninja
                femaleNinja = game.add.sprite(800, 200, 'female');
                femaleNinja.scale.setTo(0.7, 0.7);
                game.physics.arcade.enable(femaleNinja);

                femaleNinja.body.bounce.y = 0.15;
                femaleNinja.body.gravity.y = 500;
                femaleNinja.body.collideWorldBounds = true;
                femaleNinja.anchor.setTo(0.5);
                femaleNinja.scale.setTo(-0.7, 0.7);

                femaleNinja.animations.add('left', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
                femaleNinja.animations.add('right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
                femaleNinja.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);
                femaleNinja.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
                femaleNinja.animations.add('jump', [20, 21, 22, 23, 24, 25]);

                //Male ninja
                maleNinja = game.add.sprite(0, 200, 'ninjarun');
                maleNinja.scale.setTo(0.7, 0.7);
                game.physics.arcade.enable(maleNinja);

                maleNinja.body.bounce.y = 0.15;
                maleNinja.body.gravity.y = 500;
                maleNinja.body.collideWorldBounds = true;
                maleNinja.anchor.setTo(0.5);

                maleNinja.animations.add('left', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
                maleNinja.animations.add('right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 20, true);
                maleNinja.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);
                maleNinja.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
                maleNinja.animations.add('jump', [20, 21, 22, 23, 24, 25]);

                // Keystates
                playerOneKeyState = {
                    right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
                    left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
                    up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
                    attack: this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1)
                };

                playerTwoKeyState = {
                    right: this.input.keyboard.addKey(Phaser.Keyboard.D),
                    left: this.input.keyboard.addKey(Phaser.Keyboard.A),
                    up: this.input.keyboard.addKey(Phaser.Keyboard.W),
                    attack: this.input.keyboard.addKey(Phaser.Keyboard.H)
                };

            },

            update: function () {
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
                        audio.playRunningSound();

                    } else if (controls.attack.isDown) {

                        sprite.animations.play('attack');
                        audio.playFightingSound();

                    } else if (controls.right.isDown) {

                        sprite.animations.play('right');
                        sprite.body.velocity.x = 150;
                        sprite.scale.setTo(0.7, 0.7);
                        audio.playRunningSound();

                    } else {
                        sprite.animations.play('idle');
                    }

                    //  If the character is on the ground he is able to jump
                    if (controls.up.isDown && sprite.body.touching.down) {
                        audio.playMaleJumpingSound();
                        sprite.body.velocity.y = -420;
                    }
                }

                spriteControlsEngine(maleNinja, playerOneKeyState);
                spriteControlsEngine(femaleNinja, playerTwoKeyState);
            }
        };

        return {
            start: function () {
                game.state.add('gameState', gameState);
                game.state.start('gameState');

                audio.playBackgroundMusic();
            }
        };
    });
} ());
/* globals define */

(function () {
    define(function () {
        let backgroundSound = new Audio('../../content/audio/background-sound.wav');

        backgroundSound.volume = 0.6;

        backgroundSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        let maleJump1 = new Audio('../../content/audio/sound-efx/male-jump(1).ogg');
        let maleJump2 = new Audio('../../content/audio/sound-efx/male-jump(2).ogg');

        let swordAttack1 = new Audio('../../content/audio/sound-efx/sword-attack(1).wav');
        let swordAttack2 = new Audio('../../content/audio/sound-efx/sword-attack(2).wav');

        let step1 = new Audio('../../content/audio/sound-efx/step(1).ogg');
        let step2 = new Audio('../../content/audio/sound-efx/step(2).ogg');

        let rndNumber; 

        return {
            backgroundSound: backgroundSound,

            jumpOneMale: maleJump1,
            jumpTwoMale: maleJump2,

            swordAttackOne: swordAttack1,
            swordAttackTwo: swordAttack2,

            stepOne: step1,
            stepTwo: step2,

            playBackgroundMusic: function() {
                backgroundSound.play();
            },

            playRunningSound: function () {
                rndNumber = Math.round(Math.random());
                rndNumber = 0 ? step1.play() : step2.play();
            },

            playFightingSound: function () {
                rndNumber = Math.round(Math.random());
                rndNumber = 0 ? swordAttack1.play() : swordAttack2.play();
            },

            playMaleJumpingSound: function () {
                rndNumber = Math.round(Math.random());
                rndNumber = 0 ? maleJump1.play() : maleJump2.play();
            }
        };
    });
} ());
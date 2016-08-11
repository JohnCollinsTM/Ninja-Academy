/// <reference path="..\typings\index.d.ts" />

(function () {
    require.config({
        paths: {
            'jquery': '../bower_components/jquery/jquery.min',

            'content': 'game/content',
            'engine': 'game/engine',

            'audio': 'game/audio',
            'timer': 'game/timer',
            'playerFemale': 'game/player-female',
            'playerMale': 'game/player-male'
        }
    });

    require(['jquery', 'engine', 'timer'], function ($, engine, timer) {
        engine.start();

        // timer.create();
    });
} ());
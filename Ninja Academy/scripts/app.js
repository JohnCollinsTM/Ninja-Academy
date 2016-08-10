/// <reference path="..\typings\index.d.ts" />

(function () {
    require.config({
        paths: {
            'jquery': '../bower_components/jquery/jquery.min',

            'content': 'game/content',
            'engine': 'game/engine',
            'playerFemale': 'game/player-female',
            'playerMale': 'game/player-male',
        }
    });

    require(['engine'], function (engine) {
        engine.start();
    });
} ());
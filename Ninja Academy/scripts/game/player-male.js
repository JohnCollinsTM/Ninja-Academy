/* globals define */

(function () {
    define(function () {
        let maleNinja;

        let maleNinjaStats = {
            health: 100,
            attackPower: 10,
            attackSpeed: 0.5
        };

        return {
            ninja: maleNinja,
            stats: maleNinjaStats
        };
    });
} ());
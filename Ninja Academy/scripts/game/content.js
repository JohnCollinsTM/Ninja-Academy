/* globals define */

(function() {
    define(function() {
        let images = [
            'background', '../../content/images/forest-background.png',
            'ground', '../../content/images/tiles/graveyard-map-tiles/Tile (2).png',
            'left-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (14).png',
            'ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (15).png',
            'right-ledge', '../../content/images/tiles/graveyard-map-tiles/Tile (16).png',
            'skull', '../../content/images/tiles/graveyard-map-tiles/Bones (2).png',
            'bones', '../../content/images/tiles/graveyard-map-tiles/Bones (3).png',
            'bush-one', '../../content/images/objects/graveyard-map-objects/Bush (1).png',
            'bush-two', '../../content/images/objects/graveyard-map-objects/Bush (2).png',
            'tree', '../../content/images/objects/graveyard-map-objects/Tree.png',
            'dead-bush', '../../content/images/objects/graveyard-map-objects/DeadBush.png',
            'skeleton', '../../content/images/objects/graveyard-map-objects/Skeleton.png',
            'arrow-sign', '../../content/images/objects/graveyard-map-objects/ArrowSign.png',
            'tomb-stone', '../../content/images/objects/graveyard-map-objects/TombStone (2).png',
            'female-Head', '../../content/female-ninja/female-head.png',
            'male-Head', '../../content/male-ninja/male-head.png',
        ];

        let audio = [
            'background-sound', '../../content/audio/background-sound.wav',
            'maleJump-1', '../../content/audio/sound-efx/male-jump(1).ogg',
            'maleJump-2', '../../content/audio/sound-efx/male-jump(2).ogg',
            'swordAttack-1', '../../content/audio/sound-efx/sword-attack(1).wav',
            'swordAttack-2', '../../content/audio/sound-efx/sword-attack(2).wav',
            'step-1', '../../content/audio/sound-efx/step(1).ogg',
            'step-2', '../../content/audio/sound-efx/step(2).ogg'
        ];

        return {
            imgs: images,
            audio: audio,
        };
    });
}());

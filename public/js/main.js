import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js'; 

function drawBackground(background, context, sprites){
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x=x1; x<x2; x++){
            for (let y=y1; y<y2; y++){
                sprites.drawTile(background.tile, context, x, y); // 放在(45, 62)的位置
            }
        }
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16); // 拿圖片，要拿16*16
    sprites.define('ground', 0, 0); // 從圖片中的(0, 0)開始拿
    sprites.define('sky', 3, 23);
    
    loadLevel('1-1')
    .then(level => {
        level.backgrounds.forEach(background => {
            drawBackground(background, context, sprites); 
        });
    });
});
import Compositor from './Compositor.js'
import {loadLevel} from './loaders.js'; 
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js'; 
import {createBackgroundLayer, createSpriteLayer} from './layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    // 同時讀取完 兩function後
    loadBackgroundSprites(), // 回傳值給sprites
    loadLevel('1-1'),        // 回傳值給level
])
.then(([marioSprite, backgroundSprites, level]) => {
    // 確保兩個回傳值都拿到之後，才會做then內的東西
    // 也就是確保兩個值都拿到之後才會畫出來
    const pos = {
        x: 64,
        y: 64,
    }
    
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    function update(){
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update); // 告訴網頁每當要刷新頁面的時候，都要跑一次指定的函數
    }

    update();
});
import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js'; 
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js'; 
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import Keyboard from './KeyboardState.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    // 同時讀取完 兩function後
    loadBackgroundSprites(), // 回傳值給sprites
    loadLevel('1-1'),        // 回傳值給level
])
.then(([mario, backgroundSprites, level]) => {
    // 確保兩個回傳值都拿到之後，才會做then內的東西
    // 也就是確保兩個值都拿到之後才會畫出來
    const gravity = 2000;
    mario.pos.set(64, 180);
    mario.vel.set(0, -1000);

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState=>{
        if (keyState){
            mario.jump.start();
        } else{
            mario.jump.cancel();
        }
        console.log(keyState);
    });
    input.listenTo(window);
    
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    const timer = new Timer();
    timer.update = (deltaTime) => {
        mario.update(deltaTime);
        comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
});
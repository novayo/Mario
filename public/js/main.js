import Timer from './Timer.js';
import {loadLevel} from './loaders.js'; 
import {createMario} from './entities.js';
import Keyboard from './KeyboardState.js';

const input = new Keyboard();
input.addMapping(32, keyState=>{
    console.log(keyState);
});
input.listenTo(window);

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),        // 回傳值給level
])
.then(([mario, level]) => {
    // 確保兩個回傳值都拿到之後，才會做then內的東西
    // 也就是確保兩個值都拿到之後才會畫出來
    const gravity = 2000;
    mario.pos.set(64, 64);
    level.entities.add(mario);

    const timer = new Timer();
    timer.update = (deltaTime) => {
        level.update(deltaTime);
        level.comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
});
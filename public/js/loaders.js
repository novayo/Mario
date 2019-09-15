import Level from './Level.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js'; 

export function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', ()=>{
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name){
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then(r => r.json()),
        loadBackgroundSprites(), // 回傳值給sprites
    ])
    .then(([LevelSpec, backgroundSprites]) => {
        const level = new Level();

        const backgroundLayer = createBackgroundLayer(LevelSpec.backgrounds, backgroundSprites);
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(backgroundLayer);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}
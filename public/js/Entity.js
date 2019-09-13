import {Vec2} from './math.js';

export class Trait{
    constructor(name){
        this.NAME = name;
    }

    update(){
        console.warn('Unhandled !!');
    }
}

export default class Entity{
    constructor(){
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);

        this.traits = [];
    }

    // 這裡的trait指的是Vel
    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait; // 是為了mario能使用只有定義在jump中的start（mario.jump.start()）
    }

    update(deltaTime){
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
import Compositor from './Compositor.js';
import {Matrix} from './math.js';

export default class Level{
    constructor(){
        this.comp = new Compositor();
        this.entities = new Set(); // 一種dict，若add重複的（{name: value}）name，則會加不進去
        this.tiles = new Matrix();
    }

    update(deltaTime){
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }
}
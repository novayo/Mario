import Compositor from './Compositor.js';

export default class Level{
    constructor(){
        this.comp = new Compositor();
        this.entities = new Set(); // 一種dict，若add重複的（{name: value}）name，則會加不進去
    }

    update(deltaTime){
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }
}
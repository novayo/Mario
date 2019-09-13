import {Trait} from '../Entity.js';

export default class Jump extends Trait{
    constructor(){
        super('jump');

        this.duration = 0.5; // 只能按住持續(0.5/deltaTime) 秒
        this.velocity = 200; // 重力往上
        this.engageTime = 0; // 紀錄從按下去的時間開始往後多久了
    }

    start(){
        this.engageTime = this.duration;
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime){
        if (this.engageTime > 0){ // 若還沒超過按住的時間
            entity.vel.y = -this.velocity; // 使角色的y重力往上
            this.engageTime -= deltaTime;  // 持續減少持續時間
        }
    }
}
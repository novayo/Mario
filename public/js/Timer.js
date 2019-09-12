export default class Timer {
    constructor(deltaTimee = 1/60){
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;
            while (accumulatedTime > deltaTimee){
                this.update(deltaTimee); // in main.js => "timer.update = (deltaTime) => {"
                accumulatedTime -= deltaTimee;
            }
            lastTime = time;
            this.enqueue();
        }
    }

    enqueue(){
        requestAnimationFrame(this.updateProxy); // 告訴網頁每當要刷新頁面的時候，都要跑一次指定的函數
    }

    start(){
        this.enqueue();
    }
}
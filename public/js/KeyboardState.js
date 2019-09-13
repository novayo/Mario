const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor(){
        // 記錄現在按的按鍵是什麼
        this.keyStates = new Map();

        // 去記得我們有設並哪些按鍵可以按
        this.keyMap = new Map();
    }

    // 當按下按鍵的時候會跑進這裡
    addMapping(keyCode, callback){
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event){
        // 從event中抓出keyCode
        const {keyCode} = event;

        if (!this.keyMap.has(keyCode)){
            return;
        }

        // 取消其他的功能鍵（像是F5之類的）
        event.preventDefault(); 
        const keyStates = event.type === "keydown" ? PRESSED : RELEASED;

        // 去避免按住的情況
        if (this.keyStates.get(keyCode) === keyStates){ 
            return;
        }
        
        this.keyStates.set(keyCode, keyStates);
        this.keyMap.get(keyCode)(keyStates); // 不懂
    }

    listenTo(window){
        ['keydown', 'keyup'].forEach(eventName =>{
            window.addEventListener(eventName, event=>{
                this.handleEvent(event);
            });
        });
    }
}
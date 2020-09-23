import Store from '../../config/store';
import { MARIO_SPEED, WINDOW_HEIGHT, WINDOW_WIDTH, SPRITE_SIZE, MARIO_JUMP_VEL_TOP, GRAVITY, SCALE, RIGHT, LEFT, JUMP } from '../../config/constants';
import { DownCollision, UpCollision, RightCollision, LeftCollision } from './collision';
import { keyMap } from './input';

export function updateMarioPosition() {
    /**
     * 確認是否超過邊界
     */
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;
    let newTop = Store.getState().marioReducer.position.top;
    let newLeft = Store.getState().marioReducer.position.left;
    let newVelRight = Store.getState().marioReducer.velocity.right;
    let newVelLeft = Store.getState().marioReducer.velocity.left;
    newLeft += newVelLeft + newVelRight;

    if (newTop < 0) {
        newTop = 0;
    }
    else if (newTop > WINDOW_HEIGHT - marioHeight) {
        newTop = WINDOW_HEIGHT - marioHeight;
    }

    if (newLeft < 0) {
        newLeft = 0;
    }
    else if (newLeft > WINDOW_WIDTH - marioWidth) {
        newLeft = WINDOW_WIDTH - marioWidth;
    }

    // 更新狀態
    const action = {
        type: 'MARIO_MOVE',
        payload: {
            position: {
                ...Store.getState().marioReducer.position,
                top: newTop,
                left: newLeft,
            },
        }
    }
    Store.dispatch(action);
}

export function updateMarioVels() {
    /**
     * 按上跳左右時，更新 vel
     *      如果keyMap中有 右，更新加速度右
     *      如果keyMap中有 左，更新加速度左
     *      如果keyMap中有 跳 且 在地上，更新加速度上 且 狀態
     */

    let newVelRight = keyMap.has(RIGHT) ? MARIO_SPEED : 0;
    let newVelLeft = keyMap.has(LEFT) ? -MARIO_SPEED : 0;
    let newVelTop = Store.getState().marioReducer.velocity.top;
    let isJumping = Store.getState().marioReducer.isJumping;
    let isInAir = Store.getState().marioReducer.isInAir;

    if (isInAir === false && keyMap.has(JUMP)) {
        newVelTop = MARIO_JUMP_VEL_TOP;
        isJumping = true;
        isInAir = true;
    }

    if (isInAir) {
        newVelTop += GRAVITY;
    }

    // 更新狀態
    const action = {
        type: 'MARIO_MOVE',
        payload: {
            velocity: {
                ...Store.getState().marioReducer.velocity,
                top: newVelTop,
                right: newVelRight,
                left: newVelLeft,
            },
            isJumping: isJumping,
            isInAir: isInAir,
        }
    }
    Store.dispatch(action);
}

export function updateMarioCollision() {
    /**
     * 判斷垂直方向
     * if 往上加速度 且 撞到東西: 撞頭
     *      垂直加速度 = 0
     *      更新位置到 撞到的物體
     * else if 底下沒東西: 在空中
     *      在空中: 不能跳躍
     *      更新垂直加速度
     *      更新位置: 往下掉
     * else: 在地板
     *      不在空中: 能跳躍
     *      垂直加速度 = 0
     *      更新位置到 撞到的物體
     *      沒在跳躍
     */
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;
    let newVelTop = Store.getState().marioReducer.velocity.top;
    let newTop = Store.getState().marioReducer.position.top;
    let isInAir = Store.getState().marioReducer.isInAir;
    let isJumping = Store.getState().marioReducer.isJumping;
    let upCollision = UpCollision();
    let downCollision = DownCollision();

    if (upCollision.length > 0) {
        // console.log('撞頭')
        newVelTop = 0;
        newTop = upCollision[0][0] + SPRITE_SIZE
    }
    else if (downCollision.length === 0) {
        // console.log('在空中')
        isInAir = true;
        newTop += newVelTop;
    }
    else {
        // console.log('在地板')
        newVelTop = 0;
        newTop = downCollision[0][0] - marioHeight
        isInAir = false;
        isJumping = false;
    }

    // 更新狀態
    var action = {
        type: 'MARIO_MOVE',
        payload: {
            position: {
                ...Store.getState().marioReducer.position,
                top: newTop,
            },
            velocity: {
                ...Store.getState().marioReducer.velocity,
                top: newVelTop,
            },
            isInAir: isInAir,
            isJumping: isJumping,
        }
    }
    Store.dispatch(action);



    /**
     * 判斷水平方向
     * if 往右 且 右邊有東西: 撞右邊
     *      右邊速度為0
     *      更新位置到 撞到的物體
     * if 往左 且 左邊有東西: 撞左邊
     *      左邊速度為0
     *      更新位置到 撞到的物體
     */
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let newLeft = Store.getState().marioReducer.position.left;
    let newVelRight = Store.getState().marioReducer.velocity.right;
    let newVelLeft = Store.getState().marioReducer.velocity.left;
    let rightCollision = RightCollision();
    let leftCollision = LeftCollision();

    if (keyMap.has(RIGHT) && rightCollision.length > 0) {
        // console.log('撞右邊')
        newVelRight = 0;
        newLeft = rightCollision[0][1] - marioWidth
    }


    if (keyMap.has(LEFT) && leftCollision.length > 0) {
        // console.log('撞左邊')
        newVelLeft = 0;
        newLeft = leftCollision[0][1] + SPRITE_SIZE
    }

    // 更新狀態
    action = {
        type: 'MARIO_MOVE',
        payload: {
            position: {
                ...Store.getState().marioReducer.position,
                left: newLeft,
                // top: newTop,
            },
            velocity: {
                ...Store.getState().marioReducer.velocity,
                right: newVelRight,
                left: newVelLeft,
                // top: newVelTop,
            },
            // isInAir: isInAir,
            // isJumping: isJumping,
        }
    }
    Store.dispatch(action);
}

export function jump() {
    /**
     * 如果在空中才能跳躍
     */
    if (Store.getState().marioReducer.isInAir === false) {
        const action = {
            type: 'MARIO_MOVE',
            payload: {
                position: {
                    ...Store.getState().marioReducer.position,
                },
                velocity: {
                    ...Store.getState().marioReducer.velocity,
                    top: MARIO_JUMP_VEL_TOP,
                },
                isJumping: true,
                isInAir: true,
            }
        }
        Store.dispatch(action);
    }
}
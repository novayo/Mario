import Store from '../../config/store';
import { MARIO_SPEED, WINDOW_HEIGHT, WINDOW_WIDTH, SPRITE_SIZE, MARIO_JUMP_VEL_TOP, GRAVITY } from '../../config/constants';

export function updateMarioPosition() {
    var newVelTop = Store.getState().marioReducer.velocity.top;
    var isJumping = Store.getState().marioReducer.isJumping;
    if (isJumping === true) {
        if (newVelTop > -MARIO_JUMP_VEL_TOP) {
            newVelTop = 0;
            isJumping = false;
        }
        else {
            newVelTop += GRAVITY;
        }
    }

    var newTop = Store.getState().marioReducer.position.top + Store.getState().marioReducer.velocity.top;
    var newLeft = Store.getState().marioReducer.position.left + Store.getState().marioReducer.velocity.left;

    // height
    if (newTop < 0) {
        newTop = 0;
    }
    else if (newTop > WINDOW_HEIGHT) {
        newTop = WINDOW_HEIGHT;
    }

    // width
    if (newLeft < 0) {
        newLeft = 0;
    }
    else if (newLeft > WINDOW_WIDTH - SPRITE_SIZE) {
        newLeft = WINDOW_WIDTH - SPRITE_SIZE;
    }

    const action = {
        type: 'MARIO_MOVE',
        payload: {
            position: {
                top: newTop,
                left: newLeft,
            },
            velocity: {
                ...Store.getState().marioReducer.velocity,
                top: newVelTop,
            },
            isJumping: isJumping,
        }
    }
    Store.dispatch(action);
}

export function jump() {
    if (Store.getState().marioReducer.isJumping === false) {
        const action = {
            type: 'MARIO_MOVE',
            payload: {
                velocity: {
                    top: MARIO_JUMP_VEL_TOP,
                    left: 0,
                },
                isJumping: true,
            }
        }
        Store.dispatch(action);
    }
}

export function move(direction) {
    var goTop = 0;
    var goLeft = 0;

    switch (direction) {
        case 'LEFT':
            goLeft = -MARIO_SPEED;
            break;
        case 'UP':
            goTop = -MARIO_SPEED;
            break;
        case 'RIGHT':
            goLeft = MARIO_SPEED;
            break;
        case 'DOWN':
            goTop = MARIO_SPEED;
            break;
        default:
            return
    }

    const action = {
        type: 'MARIO_MOVE',
        payload: {
            position: {
                top: Store.getState().marioReducer.position.top + goTop,
                left: Store.getState().marioReducer.position.left + goLeft,
            }
        }
    }
    Store.dispatch(action);
}
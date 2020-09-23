import { LEFT, RIGHT, UP, JUMP } from '../../config/constants';

export let keyMap = new Set();

export const MarioKeydown = (e) => {
    if (keyMap.has(e.keyCode)) return;

    switch (e.keyCode) {
        case LEFT:
            keyMap.add(LEFT);
            break;
        case RIGHT:
            keyMap.add(RIGHT);
            break;
        case UP:
        case JUMP:
            keyMap.add(JUMP);
            // jump();
            break;
        default:
            return;
    }
}

export const MarioKeyUp = (e) => {
    if (keyMap.has(e.keyCode) === false) return;

    switch (e.keyCode) {
        case LEFT:
            keyMap.delete(LEFT);
            break;
        case RIGHT:
            keyMap.delete(RIGHT);
            break;
        case UP:
        case JUMP:
            keyMap.delete(JUMP);
            break;
        default:
            return;
    }
}
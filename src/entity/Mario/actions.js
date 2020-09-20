import Store from '../../config/store';
import { MARIO_SPEED } from '../../config/constants';

export default function updatePosition(direction) {
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
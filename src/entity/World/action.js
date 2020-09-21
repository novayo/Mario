import Store from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';

export function drawBlock1(start, end, y) {
    var position = [];
    for (var i = start; i < end; i++) {
        position.push([SPRITE_SIZE * y, i * SPRITE_SIZE]);
    }

    const action = {
        type: 'LOAD_TILES',
        payload: {
            ...Store.getState().worldReducer,
            blocks: Store.getState().worldReducer.blocks.concat(position),
        }
    }
    Store.dispatch(action);
}


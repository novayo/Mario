import Store from '../../config/store';
import { SPRITE_SIZE, RIGHT, DOWN } from '../../config/constants';

export function drawBlocks(data) {
    var position = [];
    var i = 0;

    if (data.direction === RIGHT) {
        for (i = 0; i < data.duplicate; i++) {
            position.push([data.top * SPRITE_SIZE, (i + data.left) * SPRITE_SIZE, data.object]);
        }
    }
    else if (data.direction === DOWN) {
        for (i = 0; i < data.duplicate; i++) {
            position.push([(i + data.top) * SPRITE_SIZE, data.left * SPRITE_SIZE, data.object]);
        }
    }

    const action = {
        type: 'LOAD_TILES',
        payload: {
            blocks: Store.getState().worldReducer.blocks.concat(position),
            loading: false,
        }
    }
    Store.dispatch(action);
}


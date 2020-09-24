import { updateMarioPosition, updateMarioVels, updateMarioCollision } from '../Mario/action';
import Store from '../../config/store';

export function WorldTime() {
    updateMarioVels();
    updateMarioCollision();
    updateMarioPosition();

    updateCamera();
    blocksMoveByCamera();
}

export function updateCamera() {
    let camera = Store.getState().worldReducer.camera;
    let marioVel = Store.getState().marioReducer.velocity;

    // camera.top = marioVel.top;
    camera.left = marioVel.left + marioVel.right;

    const action = {
        type: 'MOVE_CAMERA',
        payload: {
            camera: camera,
        }
    }

    Store.dispatch(action);
}

export function blocksMoveByCamera() {
    let camera = Store.getState().worldReducer.camera;
    let blocks = Store.getState().worldReducer.blocks.map((block) => ([block[0] - camera.top, block[1] - camera.left, block[2]]));

    const action = {
        type: 'MOVE_TILES',
        payload: {
            blocks: blocks,
        }
    }

    Store.dispatch(action);
}
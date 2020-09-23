import Store from '../../config/store';
import { SPRITE_SIZE, SCALE } from '../../config/constants';

export function DownCollision() {
    let newVelTop = Store.getState().marioReducer.velocity.top;
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;

    let isCollide = Store.getState().worldReducer.blocks.filter((blocksPosition) => {
        return Store.getState().marioReducer.position.top + newVelTop < blocksPosition[0] + SPRITE_SIZE &&
            // Store.getState().marioReducer.position.top + marioHeight < blocksPosition[0] + SPRITE_SIZE / 3 &&
            Store.getState().marioReducer.position.top + marioHeight + newVelTop >= blocksPosition[0] &&
            Store.getState().marioReducer.position.left + marioWidth > blocksPosition[1] &&
            Store.getState().marioReducer.position.left < blocksPosition[1] + SPRITE_SIZE
            ? true : false;
    })

    return isCollide;
}

export function UpCollision() {
    let newVelTop = Store.getState().marioReducer.velocity.top;
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;

    let isCollide = Store.getState().worldReducer.blocks.filter((blocksPosition) => {
        return Store.getState().marioReducer.position.top + newVelTop <= blocksPosition[0] + SPRITE_SIZE &&
            Store.getState().marioReducer.position.top + marioHeight + newVelTop > blocksPosition[0] &&
            Store.getState().marioReducer.position.left + marioWidth > blocksPosition[1] &&
            Store.getState().marioReducer.position.left < blocksPosition[1] + SPRITE_SIZE
            ? true : false;
    })

    return isCollide;
}

export function RightCollision() {
    let newVelRight = Store.getState().marioReducer.velocity.right;
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;


    let isCollide = Store.getState().worldReducer.blocks.filter((blocksPosition) => {
        return Store.getState().marioReducer.position.top < blocksPosition[0] + SPRITE_SIZE &&
            Store.getState().marioReducer.position.top + marioHeight > blocksPosition[0] &&
            Store.getState().marioReducer.position.left + marioWidth + newVelRight >= blocksPosition[1] &&
            Store.getState().marioReducer.position.left < blocksPosition[1]
            ? true : false;
    })

    return isCollide;
}

export function LeftCollision() {
    let newVelLeft = Store.getState().marioReducer.velocity.left;
    let marioWidth = Store.getState().marioReducer.size.width * SCALE;
    let marioHeight = Store.getState().marioReducer.size.height * SCALE;


    let isCollide = Store.getState().worldReducer.blocks.filter((blocksPosition) => {
        return Store.getState().marioReducer.position.top < blocksPosition[0] + SPRITE_SIZE &&
            Store.getState().marioReducer.position.top + marioHeight > blocksPosition[0] &&
            Store.getState().marioReducer.position.left + marioWidth + newVelLeft > blocksPosition[1] &&
            Store.getState().marioReducer.position.left + newVelLeft <= blocksPosition[1] + SPRITE_SIZE
            ? true : false;
    })

    return isCollide;
}
import { RIGHT, DOWN } from '../../config/constants';

export function level_1_1() {
    let blocks = [];
    blocks.push(createBlocks(0, 12, 0, RIGHT, 25)); // floor1
    blocks.push(createBlocks(0, 13, 0, RIGHT, 25)); // floor2

    /**
     * test blocks
     */
    blocks.push(createBlocks(0, 7, 0, RIGHT, 4));
    blocks.push(createBlocks(0, 7, 8, DOWN, 3));
    blocks.push(createBlocks(0, 7, 9, DOWN, 3));
    blocks.push(createBlocks(0, 7, 10, DOWN, 3));
    blocks.push(createBlocks(0, 9, 14, DOWN, 1));

    blocks.push(createBlocks(0, 7, 17, DOWN, 3));
    blocks.push(createBlocks(0, 7, 19, DOWN, 3));

    blocks.push(createBlocks(0, 10, 0, RIGHT, 8));
    blocks.push(createBlocks(0, 10, 20, RIGHT, 5));

    return blocks;
}

function createBlocks(object, top, left, direction, duplicate) {
    return {
        object: object,
        top: top,
        left: left,
        direction: direction,
        duplicate: duplicate,
    }
}
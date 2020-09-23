export const SCALE = 3;
export const SPRITE_SIZE = 16 * SCALE;

export const LEFT = 37;
export const RIGHT = 39;
export const UP = 38;
export const JUMP = 32;

export const WINDOW_WIDTH = 25 * SPRITE_SIZE;
export const WINDOW_HEIGHT = 13 * SPRITE_SIZE;

export const MARIO_SPEED = 8;
export const MARIO_JUMP_HEIGHT = 350;
export const GRAVITY = 0.5;
export const MARIO_JUMP_VEL_TOP = -Math.sqrt(GRAVITY * MARIO_JUMP_HEIGHT);
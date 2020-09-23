const initialState = {
    size: {
        width: 12,
        height: 16,
    },
    position: {
        top: 0,
        left: 48,
    },
    velocity: {
        top: 0,
        left: 0,
        right: 0,
    },
    isInAir: true,
    isJumping: false,
}

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case 'MARIO_MOVE':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
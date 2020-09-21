const initialState = {
    position: {
        top: 528,
        left: 0,
    },
    velocity: {
        top: 0,
        left: 0,
    },
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
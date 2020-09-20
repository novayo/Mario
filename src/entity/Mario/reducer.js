const initialState = {
    position: {
        top: 0,
        left: 0,
    }
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
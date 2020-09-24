// blocks = [x, y, object]
const initialState = {
    loading: true,
    blocks: [],
    camera: {
        top: 0,
        left: 0,
    }
}

export default function worldReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_TILES":
            return {
                ...state,
                ...action.payload,
            }
        case 'MOVE_TILES':
            return {
                ...state,
                ...action.payload,
            }
        case 'MOVE_CAMERA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
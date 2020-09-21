const initialState = {
    blocks: [],
}

export default function worldReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_TILES":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
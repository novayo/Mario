import { createStore, combineReducers } from 'redux';
import marioReducer from '../entity/Mario/reducer';
import worldReducer from '../entity/World/reducer';


const rootReducer = combineReducers({
    marioReducer: marioReducer,
    worldReducer: worldReducer,
});

const store = createStore(rootReducer);

export default store;
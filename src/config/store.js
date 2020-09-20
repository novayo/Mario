import { createStore, combineReducers } from 'redux';
import marioReducer from '../entity/Mario/reducer';


const rootReducer = combineReducers({
    marioReducer: marioReducer,
});

const store = createStore(rootReducer);

export default store;
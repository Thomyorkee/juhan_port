import {combineReducers, createStore} from 'redux';
import layout from './layout';
import _ from "lodash";

const rootReducer = () => {
    return combineReducers({
        layout,
    })
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer(), devTools);

export const _dispatch = _.throttle(action => {
    store.dispatch(action);
}, 1000)

export default store;
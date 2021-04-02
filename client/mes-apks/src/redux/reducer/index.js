import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducer';


const composeEnhancers = true ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
const middleWares = [
    thunkMiddleware,
    promiseMiddleware
];

const enhancer = composeEnhancers(applyMiddleware(...middleWares));
export default createStore(rootReducer(), enhancer);

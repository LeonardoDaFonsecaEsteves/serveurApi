import { combineReducers } from 'redux';
import { appStore } from './app/app.reducer';

const reducers = () => ({
   appStore
});

const rootReducer = () => combineReducers(reducers());

export default rootReducer;


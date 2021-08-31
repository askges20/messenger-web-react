import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './modules/user';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({user});
const store = createStore(rootReducer, enhancer);

export default store;
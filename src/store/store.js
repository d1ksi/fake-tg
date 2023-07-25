import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { promiseReducer } from "./promiseReduser";
import { authReducer } from './authReducer';
import { localStoredReduser } from './localStoredReduser';
import { buttonReducer } from './buttonReducer'
import { chatReducer } from './chatReducer';


const reducers = combineReducers({
   promise: promiseReducer,
   auth: localStoredReduser(authReducer, 'auth'),
   button: buttonReducer,
   chat: chatReducer,
});

export const store = createStore(
   reducers,
   applyMiddleware(thunk)
);

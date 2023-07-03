import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { promiseReducer } from "./promiseReduser";

const reducers = combineReducers({
   promise: promiseReducer,
});

export const store = createStore(
   reducers,
   applyMiddleware(thunk)
);

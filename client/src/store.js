import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";

import algorithmOptionsReducer from "./reducers/algorithmOptionsReducer"

export default createStore (
	combineReducers({
		algoOptions:algorithmOptionsReducer
    }),
	{},
	applyMiddleware(logger)
);
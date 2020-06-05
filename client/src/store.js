import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";

import algorithmOptionsReducer from "./reducers/algorithmOptionsReducer";
import algorithmReducer from "./reducers/algorithmReducer.js";

export default createStore (
	combineReducers({
		algoOptions:algorithmOptionsReducer,
		algo: algorithmReducer
    }),
	{},
	/*applyMiddleware(logger)*/
	undefined
);
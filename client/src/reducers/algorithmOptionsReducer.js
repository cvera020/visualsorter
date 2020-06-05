import constants from "../constants"

const algorithmOptionsReducer = (state = {
    algorithm: constants.TEXT_BUBBLE_SORT,
    numElements: 10,
    algoSpeed: constants.ALGO_SPEED_DEFAULT,
    execAlgorithm: false
}, action) => {
    switch (action.type) {
        case "SET_ALGORITHM":
            state = {
                ...state,
                algorithm: action.payload
            };
            break;
        case "SET_ELEMENT_COUNT":
            state = {
                ...state,
                numElements: action.payload
            };
            break;
        case "SET_ALGORITHM_SPEED":
            state = {
                ...state,
                algorithmSpeed: action.payload
            };
            break;
        case "EXEC_ALGORITHM":
            state = {
                ...state,
                execAlgorithm: action.payload
            };
            break;

    }
    return state;
};

export default algorithmOptionsReducer;

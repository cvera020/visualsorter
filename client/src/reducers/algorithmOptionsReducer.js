const algorithmOptionsReducer = (state = {
    algorithm: "Bubble Sort",
    numElements: 10,
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

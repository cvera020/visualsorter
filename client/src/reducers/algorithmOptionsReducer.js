const algorithmOptionsReducer = (state = {
    numElements: 0,
    algorithm: "Bubble Sort"
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

    }
    return state;
};

export default algorithmOptionsReducer;

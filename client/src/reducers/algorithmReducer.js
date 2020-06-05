const algorithmReducer = (state = {
    orderedSwaps: {}
}, action) => {
    switch (action.type) {
        case "SWAP_ELEMENTS":
            state = {
                ...state,
                orderedSwaps: action.payload
            };
            break;
    }
    return state;
};

export default algorithmReducer;

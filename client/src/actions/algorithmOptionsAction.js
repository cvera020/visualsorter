export function setAlgorithm(algo) {
    return {
        type: 'SET_ALGORITHM',
        payload: algo
    }
};

export function setElementCount(num) {
    return {
        type: 'SET_ELEMENT_COUNT',
        payload: num
    }
};

export function execAlgorithm(tOrF) {
    return {
        type: 'EXEC_ALGORITHM',
        payload: tOrF
    }
};
  
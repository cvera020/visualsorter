function bubbleSort(stateArray) {
    let arrCopy = stateArray.slice(0);
    let actionsToDispatch = [];
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < arrCopy.length - 1; i++) {
            if (arrCopy[i] > arrCopy[i + 1]) {
                actionsToDispatch.push([i, i + 1]);
                let temp = arrCopy[i];
                arrCopy[i] = arrCopy[i + 1];
                arrCopy[i + 1] = temp;
                isSorted = false;
            }
        }
    }
    return actionsToDispatch;
}

export default bubbleSort;
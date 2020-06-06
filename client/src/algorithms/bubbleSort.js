function bubbleSort(stateArray) {
    let arrCopy = stateArray.slice(0);
    let actionsToDispatch = [];
    let isSorted = false;
    let numElemsSorted = 0;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < arrCopy.length - 1 - numElemsSorted; i++) {
            if (arrCopy[i] > arrCopy[i + 1]) {
                actionsToDispatch.push([i, i+1, true]);
                let temp = arrCopy[i];
                arrCopy[i] = arrCopy[i + 1];
                arrCopy[i + 1] = temp;
                isSorted = false;
            } else {
                actionsToDispatch.push([i, i+1, false]);
            }
        }
        numElemsSorted++;
    }
    return actionsToDispatch;
}

export default bubbleSort;
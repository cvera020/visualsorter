import constants from "../constants";

function mergeSort(array, ctxObj) {
    let arrCopy = array.slice(0);
    let actionsToDraw = [];

    for (let i = 1; i < arrCopy.length; i *= 2) {
        for (let j = 0; j < arrCopy.length - 1; j += i * 2) {
            let start = j;
            let mid = j + i - 1;
            let end = Math.min(2 * i + j - 1, arrCopy.length - 1);
            merge(arrCopy, start, mid, end, actionsToDraw);

        }
    }
    rotateRectangles(actionsToDraw, ctxObj);
}

function merge(array, start, mid, end, actionsToDraw) {
    let leftPtr = start;
    let rightPtr = mid + 1;

    //merge both halves of the array in-place
    while (leftPtr <= mid && rightPtr <= end) {
        //e.g. let L, MID, and R correspond to leftPtr, mid, rightPtr respectively...
        // [2(L), 4(MID), 1(R), 3]
        // [1, 2(L), 4(MID), 3(R)] - after selected R: L++, MID++, R++ occurred
        // [1, 2, 4(L, MID), 3(R)] - after selected L: only L++ occurred
        // [1, 2, 3, 4(L, MID)] - after selected R: L++, MID++, R++ occurred
        actionsToDraw.push([start, end, leftPtr, rightPtr, false])
        if (array[leftPtr] < array[rightPtr]) {
            //do nothing
        } else {
            actionsToDraw.push([start, end, leftPtr, rightPtr, true])
            array.splice(leftPtr, 0, array[rightPtr++]);
            array.splice(rightPtr, 1);
            mid++;
        }
        leftPtr++;
    }
}

async function rotateRectangles(actions, component) {
    
    for (var i = 0; i < actions.length && !component.stopUpdating; i++) {
        let start = actions[i][0];
        let end = actions[i][1];
        let leftPtr = actions[i][2];
        let rightPtr = actions[i][3];
        let doRotate = actions[i][4];
        let color = constants.COLOR_COMPARING;

        if (doRotate) {
            component.yVals.splice(leftPtr, 0, component.yVals[rightPtr]);
            component.yVals.splice(rightPtr+1, 1);
            color = constants.COLOR_SWAPPING;
        } else {

        }
        component.drawRectangles(leftPtr, rightPtr, color);
        await new Promise(r => setTimeout(r, component.sortSpeedMs));
    }

    component.drawRectangles();
    component.stopUpdating = true;
    document.getElementById("sortExecuteButton").disabled = false;
}

export default mergeSort;
import constants from "../constants";
import ElementColorOption from "../util/ElementColorOption";

function quickSort(array, ctxObj) {
    let arrCopy = array.slice(0);
    let actionsToDraw = [];

    let stack = [];
    stack.push(0);
    stack.push(arrCopy.length - 1)

    while (stack.length > 0) {
        let high = stack.pop();
        let low = stack.pop();

        //find correct position for pivot index
        let newPivotIndex = sortPivotElement(arrCopy, low, high, actionsToDraw);

        //if there are unsorted elements to the left of the pivot's new position, 
        //then push that subarray's index range to the stack
        if (newPivotIndex - 1 > low) {
            stack.push(low); //lower index bound
            stack.push(newPivotIndex - 1); //upper index bound
        }

        //if there are unsorted elements to the right of the pivot's new position, 
        //then push that subarray's index range to the stack
        if (newPivotIndex + 1 < high) {
            stack.push(newPivotIndex + 1);
            stack.push(high);
        }
    }
    swapRectangles(actionsToDraw, ctxObj);
}

function sortPivotElement(arr, low, high, actionsToDraw) {
    let pivot = arr[high];

    let prevSwapIndex = low;
    for (let i = low; i <= high - 1; i++) {
        //avoid coloring the same index twice later
        actionsToDraw.push([prevSwapIndex, i, false, (prevSwapIndex != high && i != high) ? high : undefined]);

        if (arr[i] <= pivot) {
            //avoid swapping the same index with itself. 
            //als ovoid coloring the same index twice later
            if (prevSwapIndex != i) {
                actionsToDraw.push([prevSwapIndex, i, true, (prevSwapIndex != high && i != high) ? high : undefined]);
                let temp = arr[prevSwapIndex];
                arr[prevSwapIndex] = arr[i];
                arr[i] = temp;
            }
            prevSwapIndex++;
        }
    }

    //avoid coloring the same index twice later
    if (prevSwapIndex != high) {
        actionsToDraw.push([prevSwapIndex, high, true, undefined]);
        let temp = arr[prevSwapIndex];
        arr[prevSwapIndex] = arr[high];
        arr[high] = temp;
    }

    return prevSwapIndex;
}

async function swapRectangles(actions, component) {

    for (var i = 0; i < actions.length && !component.stopUpdating; i++) {
        
        let index1 = actions[i][0];
        let index2 = actions[i][1];
        let doSwap = actions[i][2];
        let pivotIndex = actions[i][3];
        let colorOptions = []
        if (doSwap) {
            let temp = component.yVals[index1];
            component.yVals[index1] = component.yVals[index2]
            component.yVals[index2] = temp;
            colorOptions.push(new ElementColorOption(index1, constants.COLOR_SWAPPING))
            colorOptions.push(new ElementColorOption(index2, constants.COLOR_SWAPPING))
        } else {
            colorOptions.push(new ElementColorOption(index1, constants.COLOR_PREV_SWAP_INDEX));
            if (index1 != index2)
                colorOptions.push(new ElementColorOption(index2, constants.COLOR_COMPARING));
        }

        if (pivotIndex != undefined)
            colorOptions.push(new ElementColorOption(pivotIndex, constants.COLOR_PIVOT))
        component.drawRectangles(colorOptions);
        await new Promise(r => setTimeout(r, component.sortSpeedMs));
    }

    component.drawRectangles();
    component.stopUpdating = true;
    document.getElementById("sortExecuteButton").disabled = false;
}

export default quickSort;
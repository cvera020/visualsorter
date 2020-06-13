import constants from "../constants"
import ElementColorOption from "../util/ElementColorOption"

function bubbleSort(array, component) {
  let arrCopy = array.slice(0);
  let actionsToDispatch = [];
  let isSorted = false;
  let numElemsSorted = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arrCopy.length - 1 - numElemsSorted; i++) {
      actionsToDispatch.push([i, i + 1, false]);
      if (arrCopy[i] > arrCopy[i + 1]) {
        actionsToDispatch.push([i, i + 1, true]);
        let temp = arrCopy[i];
        arrCopy[i] = arrCopy[i + 1];
        arrCopy[i + 1] = temp;
        isSorted = false;
      }
    }
    numElemsSorted++;
  }
  swapRectangles(actionsToDispatch, component);
}

async function swapRectangles(swaps, component) {
  for (var i = 0; i < swaps.length && !component.stopUpdating; i++) {
    let index1 = swaps[i][0];
    let index2 = swaps[i][1];
    let doSwap = swaps[i][2];

    let colorOptions = [];
    let color = constants.COLOR_COMPARING;

    if (doSwap) {
      let val1 = component.yVals[index1];
      let val2 = component.yVals[index2];
      component.yVals[index1] = val2;
      component.yVals[index2] = val1;
      color = constants.COLOR_SWAPPING;
    }
    colorOptions.push(new ElementColorOption(index1, color));
    colorOptions.push(new ElementColorOption(index2, color));
    component.drawRectangles(colorOptions);
    await new Promise(r => setTimeout(r, component.sortSpeedMs));
  }
  component.drawRectangles();
  component.stopUpdating = true;
  document.getElementById("sortExecuteButton").disabled = false;
}

export default bubbleSort;
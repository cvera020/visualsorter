import React, { Component } from 'react'
import { connect } from "react-redux"
import bubbleSort from "../algorithms/bubbleSort";

import { execAlgorithm } from "../actions/algorithmOptionsAction.js";
import constants from "../constants";

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.startUpdating = false;
    this.stopUpdating = false;
    this.sortSpeedMs = this.calcSortingSpeed(constants.ALGO_SPEED_DEFAULT);
    this.numRectangles = 10;
    this.rectWidth = 0;
    this.dist = 0;
    this.xVals = [];
    this.yVals = [];
    this.maxVal = 300;
    this.yStartPos = 20;
    this.canvasXPadding = 20;
    this.yBase = 2;
  }

  calcRectangles = (n) => {
    const canvas = document.getElementById('main_canvas');

    var width = canvas.width;
    var padding = this.canvasXPadding;
    this.numRectangles = n;
    this.rectWidth = (2 * width - 4 * padding) / (3 * n - 1);
    this.dist = this.rectWidth / 2;

    var prevX = padding;
    var newXVals = new Array();
    var newYVals = new Array();
    for (var i = 0; i < n; i++) {
      newYVals.push(Math.floor(Math.random() * this.maxVal) + this.yBase);

      newXVals.push(prevX);
      prevX += this.rectWidth + this.dist;
    }
    this.xVals = newXVals;
    this.yVals = newYVals;
  }

  drawRectangles = (i1 = 0, i2 = 0, stlye = constants.COLOR_DEFAULT) => {
    const ctx = document.getElementById('main_canvas').getContext('2d');
    ctx.clearRect(0, 0, document.getElementById('main_canvas').width, document.getElementById('main_canvas').height);
    let lesser = i1 < i2? i1 : i2;
    let greater = i1 >= i2? i1: i2;
    let i = 0;

    ctx.fillStyle = constants.COLOR_DEFAULT;
    for (; i < lesser; i++)
      ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
    
    ctx.fillStyle = stlye;
    ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
    ctx.fillStyle = constants.COLOR_DEFAULT;
    i++;

    for (; i < greater; i++)
      ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);

    ctx.fillStyle = stlye;
    ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
    ctx.fillStyle = constants.COLOR_DEFAULT;
    i++;

    for (; i < this.numRectangles; i++)
      ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
    
    ctx.fillStyle = constants.COLOR_DEFAULT;
  }

  changeNumRectangles = (n) => {
    document.getElementById('main_canvas').width = window.innerWidth - this.canvasXPadding;
    document.getElementById('main_canvas').height = (window.innerHeight * 3) / 4;
    this.calcRectangles(n);
    this.drawRectangles();
  }

  async swapRectangles(swaps) {
    let isPreppedForSwap = false;
    for (var i = 0; i < swaps.length && !this.stopUpdating; i++) {
      let index1 = swaps[i][0];
      let index2 = swaps[i][1];
      let doSwap = swaps[i][2];
      let val1 = this.yVals[index1];
      let val2 = this.yVals[index2];
      let color = constants.COLOR_COMPARING;
      if (doSwap) {
        if (!isPreppedForSwap) {
          i--;
        } else {
          this.yVals[index1] = val2;
          this.yVals[index2] = val1;
          color = constants.COLOR_SWAPPING;
        }
        isPreppedForSwap = !isPreppedForSwap;
      }
      this.drawRectangles(index1, index2, color);
      await new Promise(r => setTimeout(r, this.sortSpeedMs));
    }
    this.drawRectangles();
    this.stopUpdating = true;
    document.getElementById("sortExecuteButton").disabled = false;
  }

  calcSortingSpeed(val) {
    let max = constants.ALGO_SPEED_MAX;
    let min = constants.ALGO_SPEED_MIN;
    let mult = constants.ALGO_SPEED_MULTIPLIER;
    return (max-min-val)*mult + 1;
  }

  //runs only once: after component mounts
  componentDidMount() {
    this.changeNumRectangles(this.numRectangles);
  }

  //runs after each time mapStateToProps is fired; e.g. runs after any the relevant store sections are updated
  componentDidUpdate(prevProps) {
    if (this.props.algoSpeed != prevProps.algoSpeed) {
      this.sortSpeedMs = this.calcSortingSpeed(this.props.algoSpeed);
    }

    if (this.props.execAlgo === true) {
      document.getElementById("sortExecuteButton").disabled = true;
      this.startUpdating = true;
      this.stopUpdating = false;
      this.props.execAlgorithm(false);
    }

    if (this.startUpdating) {
      switch (this.props.algoName) {
        case constants.TEXT_BUBBLE_SORT:
          this.swapRectangles(bubbleSort(this.yVals));
          break;
        case constants.TEXT_MERGE_SORT:
          //TODO: add logic
          break;
      }
      this.startUpdating = false;
    }

    if (this.props.numRectangles != prevProps.numRectangles) {
      this.changeNumRectangles(this.props.numRectangles);
      this.stopUpdating = true;
    }
  }

  render() {
    return (
      <div>
        <canvas id="main_canvas"></canvas>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    algoName: state.algoOptions.algorithm,
    numRectangles: state.algoOptions.numElements,
    algoSpeed: state.algoOptions.algorithmSpeed,
    execAlgo: state.algoOptions.execAlgorithm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    execAlgorithm: (boolVal) => {
      dispatch(execAlgorithm(boolVal))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)

import React, { Component } from 'react'
import { connect } from "react-redux"
import bubbleSort from "../algorithms/bubbleSort";
import mergeSort from "../algorithms/mergeSort";
import quickSort from '../algorithms/quickSort';

import { execAlgorithm, randomizeElements } from "../actions/algorithmOptionsAction.js";
import constants from "../constants";

import ElementColorOption from '../util/ElementColorOption';

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.startUpdating = false;
    this.stopUpdating = false;
    this.sortSpeedMs = this.calcSortingSpeed(constants.ALGO_SPEED_DEFAULT);
    this.numRectangles = constants.ARRAY_SIZE_DEFAULT;
    this.rectWidth = 0;
    this.dist = 0;
    this.xVals = [];
    this.yVals = [];
    this.maxVal = Math.max(window.innerHeight * 0.7, 200); //to avoid  zero-height elements, maxVal should be at least 200
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

  drawRectangles = (colorOptionsArray = []) => {
    const ctx = document.getElementById('main_canvas').getContext('2d');
    ctx.clearRect(0, 0, document.getElementById('main_canvas').width, document.getElementById('main_canvas').height);
    let n = 0;
    for (let i = 0; i < this.numRectangles; i++) {
      if (n < colorOptionsArray.length && colorOptionsArray[n].index == i) {
        ctx.fillStyle = colorOptionsArray[n].color;
        ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
        ctx.fillStyle = constants.COLOR_DEFAULT;
        ++n;
      } else {
        ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
      }
    }

    /*
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
    */
  }

  changeNumRectangles = (n) => {
    document.getElementById('main_canvas').width = window.innerWidth - this.canvasXPadding;
    document.getElementById('main_canvas').height = (window.innerHeight * 3) / 4;
    this.calcRectangles(n);
    this.drawRectangles();
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
    if (this.props.numRectangles != prevProps.numRectangles) {
      this.changeNumRectangles(this.props.numRectangles);
      this.stopUpdating = true;
    }

    if (this.props.randElements == true) {
      this.changeNumRectangles(this.numRectangles);
      this.props.randomizeElements(false);
      this.stopUpdating = true;
    }

    if (this.props.algoName != prevProps.algoName) {
      this.stopUpdating = true;
    }
    
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
          bubbleSort(this.yVals, this);
          break;
        case constants.TEXT_MERGE_SORT:
          mergeSort(this.yVals, this);
          break;
        case constants.TEXT_QUICK_SORT:
          quickSort(this.yVals, this);
          break;
      }
      this.startUpdating = false;
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
    execAlgo: state.algoOptions.execAlgorithm,
    randElements: state.algoOptions.randomizeElements
  }
}

function mapDispatchToProps(dispatch) {
  return {
    execAlgorithm: (boolVal) => {
      dispatch(execAlgorithm(boolVal))
    },
    randomizeElements: (boolVal) => {
      dispatch(randomizeElements(boolVal))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)

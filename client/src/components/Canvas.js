import React, { Component } from 'react'
import { connect } from "react-redux"
import bubbleSort from "../algorithms/bubbleSort";

import { execAlgorithm } from "../actions/algorithmOptionsAction.js";

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {

    };

    this.updating = false;
    this.sortSpeedMs = 20;

    this.numRectangles = 10;
    this.rectWidth = 0;
    this.dist = 0;
    this.xVals = [];
    this.yVals = [];
    this.maxVal = 300;
    this.yStartPos = 20;
    this.canvasXPadding = 20;
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
      newYVals.push(Math.floor(Math.random() * this.maxVal));

      newXVals.push(prevX);
      prevX += this.rectWidth + this.dist;
    }
    this.xVals = newXVals;
    this.yVals = newYVals;
  }

  drawRectangles = () => {
    const ctx = document.getElementById('main_canvas').getContext('2d');
    ctx.clearRect(0, 0, document.getElementById('main_canvas').width, document.getElementById('main_canvas').height);

    for (var i = 0; i < this.numRectangles; i++) {
      ctx.fillRect(this.xVals[i], this.yStartPos, this.rectWidth, this.yVals[i]);
    }
    ctx.fill();
  }

  handleNRectangles = (n) => {
    document.getElementById('main_canvas').width = window.innerWidth - this.canvasXPadding;
    document.getElementById('main_canvas').height = (window.innerHeight * 3) / 4;
    this.calcRectangles(n);
    this.drawRectangles();
  }

  async swapRectangles(swaps) {
    for (var i = 0; i < swaps.length; i++) {
      let index1 = swaps[i][0];
      let index2 = swaps[i][1]
      let val1 = this.yVals[index1];
      let val2 = this.yVals[index2];
      this.yVals[index1] = val2;
      this.yVals[index2] = val1;
      this.drawRectangles();
      await new Promise(r2 => setTimeout(r2, this.sortSpeedMs));
    }
  }

  //runs only once: after component mounts
  componentDidMount() {
    this.handleNRectangles(this.numRectangles);
  }

  //runs after each time mapStateToProps is fired; e.g. runs after any the relevant store sections are updated
  componentDidUpdate(prevProps) {
    if (this.props.execAlgo === true) {
      this.updating = true;
      this.props.execAlgorithm(false);
    }

    if (this.updating) {
      if (this.props.algoName == "Bubble Sort") {
        this.swapRectangles(bubbleSort(this.yVals));
      }
      this.updating = false
    }

    if (this.props.numRectangles != prevProps.numRectangles) {
      this.handleNRectangles(this.props.numRectangles);
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

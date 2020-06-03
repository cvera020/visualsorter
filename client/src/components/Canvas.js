import React, { Component } from 'react'
import { connect } from "react-redux"

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numRectangles: 10, //default to 10
      rectWidth: 0,
      dist: 0, //distance between rectangles
      xVals: [],
      yVals: [],
      maxVal: 100,
      yStartPos: 20,
      canvasXPadding: 5
    }
  }

  calcRectangles(n) {
    const canvas = document.getElementById('main_canvas');

    var width = canvas.width;
    var padding = this.state.canvasXPadding;

    this.state.numRectangles = n;
    this.state.rectWidth = (2 * width - 4 * padding) / (3 * n - 1);
    this.state.dist = this.state.rectWidth / 2;

    var prevX = this.state.canvasXPadding;
    var newXVals = new Array();
    var newYVals = new Array();
    var maxVal = this.state.maxVal;
    for (var i = 0; i < n; i++) {
      newYVals.push(Math.random() * maxVal);

      newXVals.push(prevX);
      prevX += this.state.rectWidth + this.state.dist;
    }
    this.state.xVals = newXVals;
    this.state.yVals = newYVals;
  }

  drawRectangles() {
    const ctx = document.getElementById('main_canvas').getContext('2d');
    var numRectangles = this.state.numRectangles;
    var xVals = this.state.xVals;
    var yStartPos = this.state.yStartPos;
    var rWidth = this.state.rectWidth;
    var yVals = this.state.yVals;

    for (var i = 0; i < numRectangles; i++) {
      ctx.rect(xVals[i], yStartPos, rWidth, yVals[i]);
    }
    ctx.fill();
  }

  handleNRectangles(n) {
    document.getElementById('main_canvas').width = (window.innerWidth * 5) / 6;
    document.getElementById('main_canvas').height = (window.innerHeight * 3) / 4;
    this.calcRectangles(n);
    this.drawRectangles();
  }

  componentDidMount() {
    this.handleNRectangles(this.state.numRectangles);
  }

  componentDidUpdate(prevProps) {
    this.handleNRectangles(this.props.numRectangles);
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
    numRectangles: state.algoOptions.numElements
  }
}

export default connect(mapStateToProps, null)(Canvas)

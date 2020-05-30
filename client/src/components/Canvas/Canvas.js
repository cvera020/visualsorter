import React, { Component } from 'react'

class Canvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numRectangles: 0,
      rectWidth: 0,
      rectHeight: 10,
      dist: 0, //distance between rectangles
      xVals: [],
      yStart: 20,
      canvasXPadding: 5
    }
  }

  setNumRectangles(n) {
    const canvas = document.getElementById('main_canvas');

    var width = canvas.width;
    var padding = this.state.canvasXPadding;

    this.state.numRectangles = n;
    this.state.rectWidth = (2*width - 4*padding)/(3*n - 1);
    this.state.dist = this.state.rectWidth/2;

    var prevX = this.state.canvasXPadding;
    var newXVals = new Array()
    for (var i = 0; i < n; i++) {
      newXVals.push(prevX);
      prevX += this.state.rectWidth + this.state.dist;
    }
    this.state.xVals = newXVals;
  }

  drawRectangles() {
    const ctx = document.getElementById('main_canvas').getContext('2d');
    var numRectangles = this.state.numRectangles;
    var rWidth = this.state.rectWidth;
    var rHeight = this.state.rectHeight;
    var distBetween = this.state.dist;
    var xVals = this.state.xVals;
    var yStart = this.state.yStart;

    for(var i = 0; i < numRectangles; i++) {
      ctx.rect(xVals[i], yStart, rWidth, rHeight);
    }
    ctx.fill();
  }

  componentDidMount() {
    document.getElementById('main_canvas').width = (window.innerWidth * 5) / 6;
    document.getElementById('main_canvas').height = (window.innerHeight * 3) / 4;
    this.setNumRectangles(5);
    this.drawRectangles();
  }

  render () {
    return (
      <div>
        <canvas id="main_canvas"></canvas>
      </div>
    )
  }
}

export default Canvas

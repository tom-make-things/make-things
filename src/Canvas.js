import React, { Component } from "react";
import "./Canvas.css";

class Canvas extends Component {
  constructor() {
    super();
    this.state = { drawing: false };
    this.canvas = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.canvas.current.toBlob(blob => {
        this.props.saveCanvas(blob, prevProps.currentPage);
        const ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(0, 0, 640, 425);

        if (this.props.page.blob) {
          var img = new Image();
          img.onload = function() {
            ctx.drawImage(img, 0, 0);
          };
          img.src = URL.createObjectURL(this.props.page.blob);
        }
      });
    }
  }

  handleMouseDown(e) {
    this.setState({
      drawing: true,
      prevX: e.clientX,
      prevY: e.clientY
    });
  }

  handleMouseUp() {
    this.setState({ drawing: false });
  }

  handleMouseMove(e) {
    if (this.state.drawing) {
      const { offsetLeft, offsetTop } = this.canvas.current;
      const ctx = this.canvas.current.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(this.state.prevX - offsetLeft, this.state.prevY - offsetTop);
      ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
      ctx.stroke();
      ctx.closePath();
      this.setState({ prevX: e.clientX, prevY: e.clientY });
    }
  }

  render() {
    return (
      <div>
        <canvas
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          ref={this.canvas}
          width={640}
          height={425}
        />
      </div>
    );
  }
}

export default Canvas;

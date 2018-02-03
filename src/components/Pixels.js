import React from "react";

class Pixels extends React.Component {
  constructor() {
    super();

    this.state = {
      children: []
    };
  }

  componentDidMount() {
    const pixelsWidth = this.pixels.clientWidth;
    const pixelsHeight = this.pixels.clientHeight;

    const children = [];
    for (let i = 0; i < 25; i++) {
      const pixelClass = "mood-" + Math.floor(Math.random() * (5 - 1 + 1) + 1);
      const divStyle = {
        top: Math.floor(Math.random() * (pixelsHeight - 20)),
        left: Math.floor(Math.random() * (pixelsWidth - 20))
      };
      const child = <div key={i} className={pixelClass} style={divStyle} />;
      children.push(child);
    }

    this.setState({ children });
  }

  render() {
    return (
      <div
        id="pixels"
        ref={el => (this.pixels = el)}
        children={this.state.children}
      />
    );
  }
}

export default Pixels;

import React from "react";

const AboutDialog = props => {
  return (
    <div id="aboutDialog" className="dialog" style={props.style}>
      <a href="#" className="close" onClick={() => props.closeDialog()}>X</a>
        <h3>year-in-pixels-react</h3>
        <p>Remixed by <a href="https://twitter.com/alcuzzocrea" target="_blank" rel="noopener noreferrer">@alcuzzocrea</a></p>
        <p>This is a complete React porting of <a href="https://year-in-pixels.glitch.me/" target="_blank" rel="noopener noreferrer">Year in Pixel</a></p>
        <p><a href="https://github.com/alessandrocuzzocrea/year-in-pixels-react" target="_blank" rel="noopener noreferrer">Github</a></p>
        <h4>Original App by:</h4>
        <p>Alejandro AR (<a href="http://kinduff.com" target="_blank" rel="noopener noreferrer">@kinduff</a>)</p>
    </div>
  );
};

export default AboutDialog;

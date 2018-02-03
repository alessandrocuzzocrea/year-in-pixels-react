import React from "react";
import PropTypes from "prop-types";

class ImportDialog extends React.Component {
  render() {
    return (
      <div id="importDialog" className="dialog" style={this.props.style}>
        {/* prettier-ignore */}
        <a href="#" className="close" onClick={() => this.props.closeDialog()}>X</a>
        {/* prettier-ignore */}
        <h3>Import a mood calendar</h3>
        {/* prettier-ignore */}
        <p>Paste the code copied from the export tool and click the import button.</p>
        {/* prettier-ignore */}
        <textarea ref={(el) => this.textArea = el} id="importMoodText"></textarea>
        {/* prettier-ignore */}
        <button id="importMoodBtn" onClick={() => this.props.importData(this.textArea.value)}>Import</button>
      </div>
    );
  }
}

ImportDialog.propTypes = {
  importData: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default ImportDialog;

import React from 'react';
import PropTypes from 'prop-types';

class ImportDialog extends React.Component {

    // checkImportString = (val) => {

    //     if (val && val.match("^[0-9]+$")) return true;

    //     return false;
    // };

    // handleImportButtonClick = () => {
    //     const textAreaValue = this.textArea.value;

    //     if (this.checkImportString(textAreaValue)) {

    //         const data = textAreaValue.split("");
    //         this.props.importData(data);
    //     }
    // };

    render() {

        return (
            <div id="importDialog" className="dialog" style={this.props.style}>
              <a href="#" className="close" onClick={() => this.props.closeDialog()}>X</a>
              <h3>Import a mood calendar</h3>
              <p>Paste the code copied from the export tool and click the import button.</p>
              <textarea ref={(el) => this.textArea = el} id="importMoodText"></textarea>
              <button id="importMoodBtn" onClick={() => this.props.importData(this.textArea.value)}>Import</button>
            </div>
        );
    }
}

ImportDialog.propTypes = {
    importData: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
}

export default ImportDialog;

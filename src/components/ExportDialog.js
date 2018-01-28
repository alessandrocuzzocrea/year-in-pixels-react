import React from 'react';
import PropTypes from 'prop-types';

class ExportDialog extends React.Component {

    daysToString = (days) => {
        return Object
            .keys(days)
            .map((val) => { return days[val] })
            .join("");
    };

    render() {
        return (
            <div id="exportDialog" className="dialog" style={this.props.style}>
                <a href="#" className="close" onClick={() => this.props.closeDialog()}>X</a>
                <h3>Export a mood calendar</h3>
                <p>Copy the following text and use the import tool to import it.</p>
                <textarea ref={(el) => this.textArea = el} id="exportMoodText" onClick={() => { this.textArea.select() }}
                    readOnly="readonly" value={this.daysToString(this.props.days)}></textarea>
            </div>
        );
    };
};

ExportDialog.propTypes = {
    days: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
}

export default ExportDialog;

import React from 'react';
// import PropTypes from 'prop-types';

class ExportDialog extends React.Component {
    render() {

        const { days } = this.props;

        const res = Object
            .keys(this.props.days)
            .map((val) => { return days[val] })
            .join("");

        return (
            <div id="exportDialog" className="dialog" style={this.props.style}>
                <a href="#" className="close" onClick={() => this.props.closeDialog()}>X</a>
                <h3>Export a mood calendar</h3>
                <p>Copy the following text and use the import tool to import it.</p>
                <textarea ref={(el) => this.textArea = el} id="exportMoodText" onClick={() => { this.textArea.select() }}
                    readOnly="readonly" value={res}></textarea>
            </div>
        );
    }
}

export default ExportDialog;

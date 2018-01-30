import React from 'react';
import PropTypes from 'prop-types';

export const daysToString = (days) => {
    return Object
        .keys(days)
        .map((val) => { return days[val] })
        .join("");
};

const ExportDialog = (props) => {

    return (
        <div id="exportDialog" className="dialog" style={props.style}>
            <a href="#" className="close" onClick={() => props.closeDialog()}>X</a>
            <h3>Export a mood calendar</h3>
            <p>Copy the following text and use the import tool to import it.</p>
            <textarea id="exportMoodText" onClick={e => e.target.select()}
                readOnly="readonly" value={daysToString(props.days)}></textarea>
        </div>
    );
};

ExportDialog.propTypes = {
    days: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
}

export default ExportDialog;

import React from 'react';
import PropTypes from 'prop-types';

import './MoodSelector.css';

class MoodSelector extends React.Component {

    render() {
        return (
            <div id="submitMood">
                <div onClick={() => { this.props.changeDateMoodValue(0) }}><button id="none" className="mood-0" /><label></label></div>
                <div onClick={() => { this.props.changeDateMoodValue(1) }}><button id="tough" className="mood-1" /><label></label></div>
                <div onClick={() => { this.props.changeDateMoodValue(2) }}><button id="difficult" className="mood-2" /><label></label></div>
                <div onClick={() => { this.props.changeDateMoodValue(3) }}><button id="average" className="mood-3" /><label></label></div>
                <div onClick={() => { this.props.changeDateMoodValue(4) }}><button id="great" className="mood-4" /><label></label></div>
                <div onClick={() => { this.props.changeDateMoodValue(5) }}><button id="amazing" className="mood-5" /><label></label></div>
            </div>
        )
    }
}

MoodSelector.propTypes = {
    changeDateMoodValue: PropTypes.func.isRequired,
};

export default MoodSelector;

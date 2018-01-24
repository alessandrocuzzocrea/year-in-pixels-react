import React from 'react';
import PropTypes from 'prop-types';

import './MoodSelector.css';

class MoodSelector extends React.Component {
    
    render() {


        return (
            <form id="submitMood" action="">
                <div><input type="radio" id="none" name="dayMood" value="0" className="mood-0" /><label htmlFor="none"></label></div>
                <div><input type="radio" id="tough" name="dayMood" value="1" className="mood-1" /><label htmlFor="tough"></label></div>
                <div><input type="radio" id="difficult" name="dayMood" value="2" className="mood-2" /><label htmlFor="difficult"></label></div>
                <div><input type="radio" id="average" name="dayMood" value="3" className="mood-3" /><label htmlFor="LOLLER"></label></div>
                <div><input type="radio" id="great" name="dayMood" value="4" className="mood-4" /><label htmlFor="great"></label></div>
                <div><input type="radio" id="amazing" name="dayMood" value="5" className="mood-5" /><label htmlFor="amazing"></label></div>
            </form>
        )
    }
}

MoodSelector.propTypes = {
    changeDateMoodValue: PropTypes.func.isRequired,
};

export default MoodSelector;

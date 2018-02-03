import React from "react";
import PropTypes from "prop-types";

import "./MoodSelector.css";

class MoodSelector extends React.Component {
  render() {
    const { activeMoodDayValue } = this.props;

    // prettier-ignore
    const moodButtons = [
      "none", "tough", "difficult", "average", "great", "amazing"
    ].map((value, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            this.props.changeDateMoodValue(i);
          }}
        >
          <input
            type="radio"
            id={value}
            name="dayMood"
            value={i}
            className={`mood-${i}`}
            readOnly
            checked={activeMoodDayValue === i}
          />
          <label htmlFor={value} />
        </div>
      );
    });

    return (
      <form id="submitMood" action="">
        {moodButtons}
      </form>
    );
  }
}

MoodSelector.propTypes = {
  changeDateMoodValue: PropTypes.func.isRequired,
  activeMoodDayValue: PropTypes.number.isRequired
};

export default MoodSelector;

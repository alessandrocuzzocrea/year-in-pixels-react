import React from "react";
import PropTypes from "prop-types";

import "./MoodSelector.css";

const getButtons = (activeMoodDayValue, changeDateMoodValue) => {
  // prettier-ignore
  return [
    "none", "tough", "difficult", "average", "great", "amazing"
  ].map((value, i) => {
    return (
      <div
        key={i}
        onClick={() => {
          changeDateMoodValue(i);
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
};

const MoodSelector = props => {
  const { activeMoodDayValue, changeDateMoodValue } = props;

  return (
    <form id="submitMood" action="">
      {getButtons(activeMoodDayValue, changeDateMoodValue)}
    </form>
  );
};

MoodSelector.propTypes = {
  changeDateMoodValue: PropTypes.func.isRequired,
  activeMoodDayValue: PropTypes.number.isRequired
};

export default MoodSelector;

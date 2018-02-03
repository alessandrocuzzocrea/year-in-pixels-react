import React from "react";
import PropTypes from "prop-types";

import Month from "./Month";

const getMonths = (days, activeDay, setActiveDay) => {
  // prettier-ignore
  const monthsInitials = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return monthsInitials.map((initial, i) => {
    return (
      <Month
        key={i}
        monthNameInitial={initial}
        month={i}
        year={2018}
        days={days}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
    );
  });
};

const getDays = () => {
  return Array(31)
    .fill()
    .map((_, i) => {
      return (
        <span key={i} className="day">
          {i + 1}
        </span>
      );
    });
};

const MoodGrid = props => {
  const { days, activeDay, setActiveDay } = props;

  return (
    <div id="moodGrid" className="grid">
      <div className="item">
        <span />
        <div className="days">{getDays()}</div>
      </div>
      {getMonths(days, activeDay, setActiveDay)}
    </div>
  );
};

MoodGrid.propTypes = {
  days: PropTypes.object.isRequired,
  activeDay: PropTypes.number.isRequired,
  setActiveDay: PropTypes.func.isRequired
};

export default MoodGrid;

import React from "react";
import PropTypes from "prop-types";

import { daysInMonth, dayIndex } from "../helpers";
import MoodDay from "./MoodDay";

const getMonths = (days, activeDay, setActiveDay) => {
  // prettier-ignore
  const monthsInitials = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return monthsInitials.map((initial, i) => {
    const year = 2018;
    const month = i;
    const noOfDaysInMonth = daysInMonth(year, month);
    return (
      <div key={i} data-month={initial} className="item month">
        <span>{initial}</span>
        {Array(noOfDaysInMonth)
          .fill()
          .map((_, i) => {
            const date = new Date(year, month, i + 1);
            const day = dayIndex(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            const dataMood = days[day] || 0;
            const isActive = day === activeDay;
            return (
              <MoodDay
                key={i}
                day={day}
                dataMood={dataMood}
                isActive={isActive}
                setActiveDay={setActiveDay}
              />
            );
          })}
      </div>
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

class MoodGrid extends React.Component {
  render() {
    const { days, activeDay, setActiveDay } = this.props;

    return (
      <div id="moodGrid" className="grid">
        <div className="item">
          <span />
          <div className="days">{getDays()}</div>
        </div>
        {getMonths(days, activeDay, setActiveDay)}
      </div>
    );
  }
}
MoodGrid.propTypes = {
  days: PropTypes.object.isRequired,
  activeDay: PropTypes.number.isRequired,
  setActiveDay: PropTypes.func.isRequired
};

export default MoodGrid;

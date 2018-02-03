import React from "react";
import PropTypes from "prop-types";

const MoodDay = props => {
  const { day, activeDay, dataMood } = props;
  return (
    <button
      className={day === activeDay ? "active" : null}
      data-mood={dataMood}
      onClick={() => {
        props.setActiveDay(props.day);
      }}
    />
  );
};

MoodDay.propTypes = {
  day: PropTypes.number.isRequired,
  activeDay: PropTypes.number.isRequired,
  dataMood: PropTypes.number.isRequired,
  setActiveDay: PropTypes.func.isRequired
};

export default MoodDay;

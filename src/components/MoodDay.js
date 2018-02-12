import React from "react";
import PropTypes from "prop-types";

class MoodDay extends React.PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.dataMood !== nextProps.dataMood;
  // }

  render() {
    const { day, dataMood, isActive, setActiveDay } = this.props;
    return (
      <button
        className={isActive ? "active" : null}
        data-mood={dataMood}
        onClick={() => {
          setActiveDay(day);
        }}
      />
    );
  }
}

MoodDay.propTypes = {
  day: PropTypes.number.isRequired,
  dataMood: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveDay: PropTypes.func.isRequired
};

export default MoodDay;

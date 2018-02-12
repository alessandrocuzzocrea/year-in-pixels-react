import React from "react";
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";

import { dayToMonth } from "../helpers";
import { moodOptions } from "../consts";

export const getMonthMoodAvgArr = days => {
  // prettier-ignore
  const initialValue = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: []
  };

  const intermediate = Object.keys(days).reduce((acc, val) => {
    const currMonth = dayToMonth(parseInt(val, 10));
    const moodValue = days[val];
    if (moodValue !== 0) acc[currMonth].push(days[val]);
    return acc;
  }, initialValue);

  return Object.keys(intermediate)
    .map(val => {
      return intermediate[val];
    })
    .map(array => {
      return (
        array.reduce(function(acc, val) {
          return acc + val;
        }, 0) / array.length || 0
      );
    });
};

export const labelInterpolation = (_, index) => {
  return moodOptions[index];
};

const options = {
  axisY: {
    onlyInteger: true,
    labelInterpolationFnc: labelInterpolation,
    stretch: true,
    offset: 50
  },
  axisX: {
    offset: 20
  },
  high: 6,
  low: 0,
  showArea: true,
  showLine: true,
  showPoint: false,
  fullWidth: true,
  chartPadding: {
    top: 0,
    right: 10
  }
};

const type = "Line";

class Chart extends React.PureComponent {
  render() {
    const { days } = this.props;

    const data = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [getMonthMoodAvgArr(days)]
    };

    return (
      <div id="chart">
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    );
  }
}
Chart.propTypes = {
  days: PropTypes.object.isRequired
};

export default Chart;

import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';

import { dayToMonth } from '../helpers';
import { moodOptions } from '../consts';

class Chart extends React.Component {

  getMonthMoodAvgArr = (days) => {

    const initialValue = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [] };

    const res0 = Object.keys(days).reduce((acc, val) => {
      const currMonth = dayToMonth(parseInt(val, 10));
      const moodValue = days[val];
      if (moodValue !== 0) acc[currMonth].push(days[val]);
      return acc;
    }, initialValue);
    const res1 = Object.keys(res0).map((val) => {
      return res0[val];
    });
    const res2 = res1.map(array => {
      return array.reduce(function (acc, val) { return acc + val; }, 0) / array.length || 0;
    });

    return res2;
  };

  labelInterpolation = (_, index) => {
    return moodOptions[index];
  };

  render() {

    const { days } = this.props;

    const data = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [this.getMonthMoodAvgArr(days)],
    };

    const options = {
      axisY: {
        onlyInteger: true,
        labelInterpolationFnc: this.labelInterpolation,
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

    const type = 'Line';

    return (
      <div id="chart">
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    );
  }
}

Chart.propTypes = {
  days: PropTypes.object.isRequired,
}

export default Chart;

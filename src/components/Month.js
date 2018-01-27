import React from 'react';
import PropTypes from 'prop-types';
import { daysInMonth } from '../helpers';

import MoodDay from './MoodDay'

class Month extends React.Component {

    render(){

        const {month, year, monthNameInitial, days, activeDay} = this.props;
        const noOfDaysInMonth = daysInMonth(year, month);

        return (
            <div data-month={monthNameInitial} className="item month">
                <span>{monthNameInitial}</span>
                    { Array(noOfDaysInMonth).fill().map((_, i) => {

                        const date = new Date(year, month, i+1).setHours(0,0,0,0);
                        const dataMood = days[date] || 0;

                        return <MoodDay key={i} date={date} dataMood={dataMood} activeDay={activeDay} setActiveDay={this.props.setActiveDay} />
                    })
                    }
            </div>
        );
    };
}

Month.propTypes = {
    monthNameInitial: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,

    days: PropTypes.object.isRequired,
    activeDay: PropTypes.number.isRequired,
    setActiveDay: PropTypes.func.isRequired,
};

export default Month;

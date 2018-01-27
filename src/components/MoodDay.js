import React from 'react';
import PropTypes from 'prop-types';

const MoodDay = (props) => {
        const { date, activeDay, dataMood } = props;
        return <button
            className={date === activeDay ? "active" : null}
            data-mood={dataMood}
            onClick={() => { props.setActiveDay(props.date) }}>
        </button>
};

MoodDay.propTypes = {
    date: PropTypes.number.isRequired,

    dataMood: PropTypes.number.isRequired,
    activeDay: PropTypes.number.isRequired,
    setActiveDay: PropTypes.func.isRequired,
};

export default MoodDay;
import React from 'react';
import PropTypes from 'prop-types';

class MoodDay extends React.Component {

    handleClick = () => {

        console.log(new Date(this.props.date));
        this.props.setActiveDay(this.props.date);
    };

    render() {
 
        const {date, activeDay, dataMood} = this.props;
 
        

        return <button className={date === activeDay ? "active" : "" } data-mood={ dataMood } onClick={ this.handleClick }></button>
    }
}

MoodDay.propTypes = {
    date: PropTypes.number.isRequired,

    dataMood: PropTypes.number.isRequired,
    activeDay: PropTypes.number.isRequired,
    setActiveDay: PropTypes.func.isRequired,
}

export default MoodDay;
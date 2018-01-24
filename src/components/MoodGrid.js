import React from 'react';
import PropTypes from 'prop-types';

import Month from './Month';

class MoodGrid extends React.Component {

    getMonths = () => {
        const monthsInitials = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        return monthsInitials.map( (initial, i) => {
            return <Month key={i} monthNameInitial={initial} month={i} year={2018} days={this.props.days} activeDay={this.props.activeDay} setActiveDay={this.props.setActiveDay}/>
        });
    
    }

    getDays = () => {

        return Array(31)
            .fill()
            .map((_, i) => {
                return <span key={i} className="day">{i + 1}</span>
            });
    };

    render() {
        return (
            <div id="moodGrid" className="grid">
                <div className="item">
                    <span></span>
                    <div className="days">
                        {this.getDays()}
                    </div>
                </div>
                {this.getMonths()}
            </div>
        );
    }
}

MoodGrid.propTypes = {
    days: PropTypes.object.isRequired,
    activeDay: PropTypes.number.isRequired,
    setActiveDay: PropTypes.func.isRequired,
};

export default MoodGrid;

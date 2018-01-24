import React from 'react';
import PropTypes from 'prop-types';

import MoodSelector from './MoodSelector';
import Chart from './Chart';
import QuoteOfTheDay from './QuoteOfTheDay';

class Interface extends React.Component {
    
    getMessage = (value) => {

        switch (value) {
            case 0:
                return <div id="message">You have not set a mood today.</div>;
            break;
            case 1:
                return <div id="message">Your day was <u>tough</u>.</div>;
            break;
            case 2:
                return <div id="message">Your day was <u>difficult</u>.</div>;
            break;
            case 3:
                return <div id="message">Your day was <u>average</u>.</div>;
            break;
            case 4:
                return <div id="message">Your day was <u>great</u>.</div>;
            break;
            case 5:
                return <div id="message">Your day was <u>amazing</u>.</div>;
            break;
        
            default:
                return <div>ERROR</div>
                break;
        }
    };
    
    render() {
        return (
            <div className="interface">
                <h2>Hello there,
                        <br />how are you feeling today?</h2>
                <MoodSelector activeMoodDayValue={this.props.activeMoodDayValue} changeDateMoodValue={ this.props.changeDateMoodValue}/>
                { this.getMessage(this.props.activeMoodDayValue) }
                <Chart days={this.props.days}/>
                <QuoteOfTheDay/>
                <div id="footer">
                    <ul className="menu">
                        <li>
                            <a href="#" data-menu="import">Import</a>
                        </li>
                        <li>
                            <a href="#" data-menu="export">Export</a>
                        </li>
                        <li>
                            <a href="#" data-menu="demo">Demo data</a>
                        </li>
                        <li>
                            <a href="#" data-menu="clear">Clear data</a>
                        </li>
                        <li>
                            <a href="#" data-menu="about">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Interface.propTypes = {
    days: PropTypes.object.isRequired,
    changeDateMoodValue: PropTypes.func.isRequired,
    activeMoodDayValue: PropTypes.number.isRequired,
};

export default Interface;

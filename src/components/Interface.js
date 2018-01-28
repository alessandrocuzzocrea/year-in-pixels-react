import React from 'react';
import PropTypes from 'prop-types';

import MoodSelector from './MoodSelector';
import Chart from './Chart';
import QuoteOfTheDay from './QuoteOfTheDay';

class Interface extends React.Component {

    getMessage = (value) => {

        switch (value) {
            case 0: return <div id="message">You have not set a mood today.</div>;
            case 1: return <div id="message">Your day was <u>tough</u>.</div>;
            case 2: return <div id="message">Your day was <u>difficult</u>.</div>;
            case 3: return <div id="message">Your day was <u>average</u>.</div>;
            case 4: return <div id="message">Your day was <u>great</u>.</div>;
            case 5: return <div id="message">Your day was <u>amazing</u>.</div>;
            default: return null;
        }
    };

    render() {
        return (
            <div className="interface">
                <h2>Hello there,
                        <br />how are you feeling today?</h2>
                <MoodSelector activeMoodDayValue={this.props.activeMoodDayValue} changeDateMoodValue={this.props.changeDateMoodValue} />
                {this.getMessage(this.props.activeMoodDayValue)}
                <Chart days={this.props.days} />
                <QuoteOfTheDay />
                <div id="footer">
                    <ul className="menu">
                        <li>
                            <a href="#" data-menu="import" onClick={() => this.props.openDialog("import")}>Import</a>
                        </li>
                        <li>
                            <a href="#" data-menu="export" onClick={() => this.props.openDialog("export")}>Export</a>
                        </li>
                        <li>
                            <a href="#" data-menu="demo" onClick={() => this.props.askDemoDataConfirm()}>Demo data</a>
                        </li>
                        <li>
                            <a href="#" data-menu="clear" onClick={() => this.props.askClearDataConfirm()}>Clear data</a>
                        </li>
                        <li>
                            <a href="#" data-menu="about" onClick={() => this.props.openDialog("about")}>About</a>
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

    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
};

export default Interface;

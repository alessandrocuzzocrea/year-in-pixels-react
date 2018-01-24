import React from 'react';
import PropTypes from 'prop-types';

import MoodSelector from './MoodSelector';

class Interface extends React.Component {
    render() {
        return (
            <div className="interface">
                <h2>Hello there,
                        <br />how are you feeling today?</h2>
                <MoodSelector changeDateMoodValue={ this.props.changeDateMoodValue}/>
                <div id="message">
                    <p>
                        Your day has been
                            <u>amazing</u>.</p>
                </div>
                <div id="chart">
                    <div className="ct-chart"></div>
                </div>
                <div id="quoteOfTheDay">
                    <p>Loading...</p>
                </div>
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
    changeDateMoodValue: PropTypes.func.isRequired,
};

export default Interface;

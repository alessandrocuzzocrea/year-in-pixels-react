import React from 'react';

class Interface extends React.Component {
    render() {
        return (
            <div className="interface">
                <h2>Hello there,
                        <br />how are you feeling today?</h2>
                <form id="submitMood" action="">
                    <div>
                        <input type="radio" id="none" name="dayMood" value="0" className="mood-0" />
                        <label htmlFor="none"></label>
                    </div>
                    <div>
                        <input type="radio" id="tough" name="dayMood" value="1" className="mood-1" />
                        <label htmlFor="tough"></label>
                    </div>
                    <div>
                        <input type="radio" id="difficult" name="dayMood" value="2" className="mood-2" />
                        <label htmlFor="difficult"></label>
                    </div>
                    <div>
                        <input type="radio" id="average" name="dayMood" value="3" className="mood-3" />
                        <label htmlFor="average"></label>
                    </div>
                    <div>
                        <input type="radio" id="great" name="dayMood" value="4" className="mood-4" />
                        <label htmlFor="great"></label>
                    </div>
                    <div>
                        <input type="radio" id="amazing" name="dayMood" value="5" className="mood-5" />
                        <label htmlFor="amazing"></label>
                    </div>
                </form>
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
                    {/* <ul className="social">
                        <li>
                            <a href="https://twitter.com/intent/tweet?text=Start+tracking+your+year+and+how+you+feel+in+pixels"
                                                        data-size="large" className="twitter-share-button">Tweet</a>
                        </li>
                        <li>
                            <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fyear-in-pixels.glitch.me%2F&amp;layout=button_count&amp;size=large&amp;mobile_iframe=true&amp;appId=132593400164506&amp;width=84&amp;height=28"
                                                        width="95" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                                                        allowtransparency="true"></iframe>
                        </li>
                    </ul> */}
                </div>
            </div>
        );
    }
}

export default Interface;

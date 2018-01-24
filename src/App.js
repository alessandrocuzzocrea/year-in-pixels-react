import React from 'react';
import logo from './logo.svg';
import './reset.css';
import './style.css';
import './App.css';

import Header from './components/Header';
import Pixels from './components/Pixels';
import MoodGrid from './components/MoodGrid';
import Interface from './components/Interface';

class App extends React.Component {

  constructor() {
    super();

    const today = new Date();

    let currentDay = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

    const days = {};

    while (currentDay.getFullYear() === today.getFullYear()) {
      days[currentDay.setHours(0,0,0)] = 0;
      let nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      currentDay = nextDay;
    }

    this.state = {
      activeMoodDay: today.setHours(0,0,0),
      days: days,
      
    }
  }

  changeActiveMoodDay = (activeMoodDay) => {

    this.setState({activeMoodDay});

  };

  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="column">
            <Header />
          </div>
          <div className="column">
            <Pixels />
          </div>
        </div>
        <div className="container">
          <div className="column">
            <MoodGrid days={this.state.days} activeDay={this.state.activeMoodDay} setActiveDay={this.changeActiveMoodDay}/>
          </div>
          <div className="column">
            <Interface />
          </div>
        </div>
        <div id="menu">
          <div id="importDialog" className="dialog">
            <a href="#" className="close">X</a>
            <h3>Import a mood calendar</h3>
            <p>Paste the code copied from the export tool and click the import button.</p>
            <textarea id="importMoodText"></textarea>
            <button id="importMoodBtn">Import</button>
          </div>
          <div id="exportDialog" className="dialog">
            <a href="#" className="close">X</a>
            <h3>Export a mood calendar</h3>
            <p>Copy the following text and use the import tool to import it.</p>
            <textarea id="exportMoodText" onClick={() => {/*"this.focus();this.select()"*/ }}
              readOnly="readonly"></textarea>
          </div>
          <div id="aboutDialog" className="dialog">
            <a href="#" className="close">X</a>
            <h3>Hello there and thank you</h3>
            <p>First of all, thank you for your interest in this little tool.</p>
            <p>This tool was made to keep track of your mood during the entire year, using pixels. You can load this page
                    every day and select how you're feeling. The tool will keep track of your mood and give you a visual
                    for how you've felt during the year.</p>
            <p>If you use different browsers or computers, you can import/export your calendar too.</p>
            <p>While the idea for this tool is not new at all, I've never seen this format online before. I hope you enjoy
                    it.</p>
            <h3>About the author</h3>
            <p>My name is Alejandro AR (
                    <a href="http://kinduff.com">@kinduff</a>) and I enjoy making little tools that help people out.</p>
            <p>Thanks for passing by.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

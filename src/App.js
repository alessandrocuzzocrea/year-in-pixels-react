import React from 'react';
import { Transition } from 'react-transition-group'

import Header from './components/Header';
import Pixels from './components/Pixels';
import MoodGrid from './components/MoodGrid';
import Interface from './components/Interface';
import ImportDialog from './components/ImportDialog';
import ExportDialog from './components/ExportDialog';

import './reset.css';
import './style.css';


class App extends React.Component {

  constructor() {
    super();

    const today = new Date();

    let currentDay = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

    const days = {};

    while (currentDay.getFullYear() === today.getFullYear()) {
      days[currentDay.setHours(0, 0, 0, 0)] = 0;
      let nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      currentDay = nextDay;
    }

    this.state = {
      activeMoodDay: today.setHours(0, 0, 0, 0),
      days: days,
      openDialog: null,
    }
  }

  changeActiveMoodDay = (activeMoodDay) => {

    this.setState({ activeMoodDay });

  };

  changeDateMoodValue = (value) => {

    this.setState((prevState) => {
      const days = { ...prevState.days };
      days[prevState.activeMoodDay] = value;
      return { days };
    });
  };

  openDialog = (openDialog) => {
    this.setState({ openDialog });
  };

  closeDialog = () => {
    const openDialog = null;
    this.setState({ openDialog });
  };

  askDemoDataConfirm = () => {
    if (window.confirm("Careful, this will clear all the current data. Are you sure?")) {
      this.fillDemoData();
    }
  };

  fillDemoData = () => {

    const today = new Date();
    let currentDay = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
    const days = {};

    while (currentDay.getFullYear() === today.getFullYear()) {
      days[currentDay.setHours(0, 0, 0, 0)] = Math.floor(Math.random() * 5 + 1);
      let nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      currentDay = nextDay;
    }

    this.setState({ days });
  }

  askClearDataConfirm = () => {
    if (window.confirm("Careful, this will clear all the current data. Are you sure?")) {
      this.clearData();
    }
  };

  clearData = () => {

    const today = new Date();
    let currentDay = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
    const days = {};

    while (currentDay.getFullYear() === today.getFullYear()) {
      days[currentDay.setHours(0, 0, 0, 0)] = 0;
      let nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      currentDay = nextDay;
    }

    this.setState({ days });
  }

  importData = (data) => {

    const days = { ...this.state.days };
    const daysKeys = Object.keys(days);

    if (data.length === daysKeys.length) {

      daysKeys.map((key, i) => {
        days[key] = parseInt(data[i], 10) || 0;
      });

      if (window.confirm("Careful, this will clear all the current data. Are you sure?")) {
        this.setState({ days });
        this.closeDialog();

        // window.alert('The import was successful!');
      }

    } else {
      window.alert("We're sorry.\nThe data is not valid. Please try again.");
    }
  }

  render() {

    const transitionStyles = {
      entering: { opacity: 0, display: "block" },
      entered: { opacity: 1, display: "block" },
      exiting: { opacity: 0, display: "block" },
      exited: { opacity: 0, display: "none" },
    };

    const duration = 100;

    const activeMoodDayValue = this.state.days[this.state.activeMoodDay];

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
            <MoodGrid days={this.state.days} activeDay={this.state.activeMoodDay} setActiveDay={this.changeActiveMoodDay} />
          </div>
          <div className="column">
            <Interface
              days={this.state.days}
              activeMoodDayValue={activeMoodDayValue}
              changeDateMoodValue={this.changeDateMoodValue}
              openDialog={this.openDialog}
              closeDialog={this.closeDialog}
              askDemoDataConfirm={this.askDemoDataConfirm}
              askClearDataConfirm={this.askClearDataConfirm}
            />
          </div>
        </div>
        <div id="menu">
          <Transition in={this.state.openDialog === "import"} timeout={duration} mountOnEnter unmountOnExit>
            {(state) => (<ImportDialog importData={this.importData} closeDialog={this.closeDialog} style={{ ...transitionStyles[state] }} />)}
          </Transition>

          <Transition in={this.state.openDialog === "export"} timeout={duration} mountOnEnter unmountOnExit>
            {(state) => (<ExportDialog days={this.state.days} closeDialog={this.closeDialog} style={{ ...transitionStyles[state] }} />)}
          </Transition>

          <Transition in={this.state.openDialog === "about"} timeout={duration} mountOnEnter unmountOnExit>
            {(state) => (
              <div id="aboutDialog" className="dialog" style={{ ...transitionStyles[state] }}>
                <a href="#" className="close" onClick={() => this.closeDialog()}>X</a>
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
            )}

          </Transition>

        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Transition } from 'react-transition-group';

import consts from './consts';
import { daysInYear, currDayIndex, currYear } from './helpers';

import Pixels from './components/Pixels';
import MoodGrid from './components/MoodGrid';
import Interface from './components/Interface';
import ImportDialog from './components/ImportDialog';
import ExportDialog from './components/ExportDialog';
import AboutDialog from './components/AboutDialog';

import './reset.css';
import './style.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    const currYear = new Date().getFullYear();

    let days = this.loadState();
    if (!days) {
      days = {};
      Array(daysInYear(currYear))
        .fill(0)
        .forEach((v, i) => {
          days[i] = v;
        });
    };

    this.state = {
      activeMoodDay: currDayIndex(),
      days: days,
      openDialog: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.saveState(this.state.days);
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
    if (window.confirm(consts.clearDataMsg)) {
      this.fillDemoData();
    }
  };

  fillDemoData = () => {

    const currYear = new Date().getFullYear();
    const days = {};
    Array(daysInYear(currYear))
      .fill(0)
      .forEach((_, i) => {
        days[i] = Math.floor(Math.random() * 5 + 1);
      });

    this.setState({ days });
  }

  askClearDataConfirm = () => {
    if (window.confirm("Careful, this will clear all the current data. Are you sure?")) {
      this.clearData();
    }
  };

  clearData = () => {

    const currYear = new Date().getFullYear();
    const days = {};
    Array(daysInYear(currYear))
      .fill(0)
      .forEach((_, i) => {
        days[i] = 0;
      });

    this.setState({ days });
  }

  isImportValid = (data) => {

    if (!data) return false;
    if (data.length !== daysInYear(currYear())) return false;
    if (data.match(/[^0-5]/)) return false;

    return true;
  }

  importData = (data) => {

    const currYear = new Date().getFullYear();
    const currYearDays = daysInYear(currYear);

    if (data.length === currYearDays) {

      const days = {};
      Array(currYearDays)
        .fill(0)
        .forEach((_, i) => {
          days[i] = parseInt(data[i], 10) || 0;
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

  saveState = (days) => {
    localStorage.setItem('moodCalendar', JSON.stringify(days));
  }

  loadState = () => {
    const days = localStorage.getItem('moodCalendar');
    if (days) {
      try {
        return JSON.parse(days);
      } catch (e) {
        return null;
      }
    }
  }

  render() {

    const { enableAnimations } = this.props;

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
            <div className="header">
              <h1>Year in Pixels</h1>
            </div>
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
          <Transition
            in={this.state.openDialog === consts.dialogs.import}
            timeout={duration}
            mountOnEnter
            unmountOnExit
            enter={enableAnimations}
            exit={enableAnimations}
          >
            {(state) => (
              <ImportDialog
                importData={this.importData}
                closeDialog={this.closeDialog}
                style={{ ...transitionStyles[state] }}
              />)}
          </Transition>
          <Transition
            in={this.state.openDialog === consts.dialogs.export}
            timeout={duration}
            mountOnEnter
            unmountOnExit
            enter={enableAnimations}
            exit={enableAnimations}
          >
            {(state) => (
              <ExportDialog
                days={this.state.days}
                closeDialog={this.closeDialog}
                style={{ ...transitionStyles[state] }}
              />)}
          </Transition>
          <Transition
            in={this.state.openDialog === consts.dialogs.about}
            timeout={duration}
            mountOnEnter
            unmountOnExit
            enter={enableAnimations}
            exit={enableAnimations}
          >
            {(state) => (
              <AboutDialog
                closeDialog={this.closeDialog}
                style={{
                  ...transitionStyles[state]
                }} />)}
          </Transition>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  enableAnimations: true
};

export default App;

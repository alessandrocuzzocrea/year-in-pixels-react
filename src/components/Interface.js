import React from "react";
import PropTypes from "prop-types";

import MoodSelector from "./MoodSelector";
import Chart from "./Chart";
import QuoteOfTheDay from "./QuoteOfTheDay";

export const getMessage = value => {
  // prettier-ignore
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

const getLink = (klass, onClickFn, text) => {
  return (
    <li>
      {/* prettier-ignore */}
      <a href="#" data-menu={klass} onClick={() => onClickFn(klass)}> {text}</a>
    </li>
  );
};

const Interface = props => {
  return (
    <div className="interface">
      <h2>
        Hello there, <br />how are you feeling today?
      </h2>
      <MoodSelector
        activeMoodDayValue={props.activeMoodDayValue}
        changeDateMoodValue={props.changeDateMoodValue}
      />
      {getMessage(props.activeMoodDayValue)}
      <Chart days={props.days} />
      <QuoteOfTheDay />
      <div id="footer">
        <ul className="menu">
          {getLink("import", props.openDialog, "Import")}
          {getLink("export", props.openDialog, "Export")}
          {getLink("demo", props.askDemoDataConfirm, "Demo data")}
          {getLink("clear", props.askClearDataConfirm, "Clear data")}
          {getLink("about", props.openDialog, "About")}
        </ul>
      </div>
    </div>
  );
};

Interface.propTypes = {
  days: PropTypes.object.isRequired,
  changeDateMoodValue: PropTypes.func.isRequired,
  activeMoodDayValue: PropTypes.number.isRequired,

  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default Interface;

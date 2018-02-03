import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import calendarMockData from '../../fixtures/calendarMockData';

import Interface, { getMessage } from './Interface';

describe('<Interface />', () => {

    it('works correctly', () => {

        const { days, activeMoodDayValue, changeDateMoodValue } = calendarMockData;
        const fn = () => { };

        const wrapper = shallow(
            <Interface
                days={days}
                activeMoodDayValue={activeMoodDayValue}
                changeDateMoodValue={fn}
                openDialog={fn}
                closeDialog={fn}
                askDemoDataConfirm={fn}
                askClearDataConfirm={fn}
            />);
    });

    it('it returns null if the moodValue is not one of the possible values', () => {

        expect(getMessage(-1)).toEqual(null);
        expect(getMessage(6)).toEqual(null);
    });

});

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import moodCalendarMockData from '../../fixtures/moodCalendarMockData';

import Interface from './Interface';

describe('<Interface />', () => {

    it('works correctly', () => {

        const { days, activeMoodDayValue, changeDateMoodValue } = moodCalendarMockData;
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

        const { days, activeMoodDayValue, changeDateMoodValue } = moodCalendarMockData;
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

        expect(wrapper.instance().getMessage(-1)).toEqual(null);
        expect(wrapper.instance().getMessage(6)).toEqual(null);
    })

});

import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { days, daysAvg } from '../../fixtures/moodCalendarMockData';

import Chart from './Chart';

describe('<Chart />', () => {

    it('works correctly', () => {
        const wrapper = shallow(<Chart days={days} />);
    });

    it('getMonthMoodAvgArr give the expected result', () => {
        const wrapper = shallow(<Chart days={days} />);
        const avr = wrapper.instance().getMonthMoodAvgArr(days);
        expect(avr).toEqual(daysAvg);
    });
});

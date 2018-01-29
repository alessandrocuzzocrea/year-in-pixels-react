import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { days, daysAvg } from '../../fixtures/moodCalendarMockData';
import { moodOptions } from '../consts';

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

    it('labelInterpolation returns the correct values', () => {

        const wrapper = shallow(<Chart days={days} />);
        expect(wrapper.instance().labelInterpolation(null, 0)).toEqual(moodOptions[0]);
        expect(wrapper.instance().labelInterpolation(null, 1)).toEqual(moodOptions[1]);
        expect(wrapper.instance().labelInterpolation(null, 2)).toEqual(moodOptions[2]);
        expect(wrapper.instance().labelInterpolation(null, 3)).toEqual(moodOptions[3]);
        expect(wrapper.instance().labelInterpolation(null, 4)).toEqual(moodOptions[4]);
        expect(wrapper.instance().labelInterpolation(null, 5)).toEqual(moodOptions[5]);
    });
});

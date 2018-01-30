import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { days, daysAvg } from '../../fixtures/moodCalendarMockData';
import { moodOptions } from '../consts';

import Chart, { getMonthMoodAvgArr, labelInterpolation } from './Chart';

describe('<Chart />', () => {

    it('works correctly', () => {
        const wrapper = shallow(<Chart days={days} />);
    });
});

describe('getMonthModdAvg', () => {

    it('getMonthMoodAvgArr give the expected result', () => {

        const avr = getMonthMoodAvgArr(days);
        expect(avr).toEqual(daysAvg);
    });
});

describe('labelInterpolation', () => {

    it('labelInterpolation returns the correct values', () => {

        expect(labelInterpolation(null, 0)).toEqual(moodOptions[0]);
        expect(labelInterpolation(null, 1)).toEqual(moodOptions[1]);
        expect(labelInterpolation(null, 2)).toEqual(moodOptions[2]);
        expect(labelInterpolation(null, 3)).toEqual(moodOptions[3]);
        expect(labelInterpolation(null, 4)).toEqual(moodOptions[4]);
        expect(labelInterpolation(null, 5)).toEqual(moodOptions[5]);
    });
});

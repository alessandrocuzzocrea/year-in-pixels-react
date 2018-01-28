import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import MoodDay from './MoodDay';

describe('<MoodDay />', () => {

    it ('works correctly', () => {
        const wrapper = shallow(
        <MoodDay
            day={0}
            activeDay={0}
            dataMood={0}
            setActiveDay={jest.fn()}
        />);
    });

    it('has active class if is the active day', () => {
        const wrapper = shallow(
            <MoodDay
                day={0}
                activeDay={0}
                dataMood={0}
                setActiveDay={jest.fn()}
            />);
            // console.log(wrapper.html());
        expect(wrapper.find('button').hasClass('active')).toBe(true);
    });

    it('does not have active class if is the day is not active', () => {
        const wrapper = shallow(
            <MoodDay
                day={0}
                activeDay={1}
                dataMood={0}
                setActiveDay={jest.fn()}
            />);
        expect(wrapper.find('button').hasClass('active')).toBe(false);
    });
});

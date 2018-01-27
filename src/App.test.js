import React from 'react';
import App from './App';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

var fetchMock = require('fetch-mock');
var qodMockData = require('../fixtures/qodMockData')
fetchMock.get('https://quotes.rest/qod', qodMockData);

global.window = {}
import localStorage from 'mock-local-storage'
import { request } from 'https';
window.localStorage = global.localStorage

import moodCalendarMockData from '../fixtures/moodCalendarMockData';


describe('<App />', () => {

    beforeEach(() => {
        window.localStorage.clear();
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    });

    it('starts with current date as active day', () => {
        const todayDate = new Date().setHours(0, 0, 0, 0);
        const wrapper = shallow(<App />);
        expect(wrapper.state().activeMoodDay).toBe(todayDate);
    });

    it('change active day on click', () => {
        const wrapper = mount(<App />);
        {
            const moodDay = wrapper.find('MoodDay').at(0);
            moodDay.find('button').simulate('click');
            expect(wrapper.state().activeMoodDay).toBe(moodDay.props().date);
        };
        {
            const moodDay = wrapper.find('MoodDay').at(1);
            moodDay.find('button').simulate('click');
            expect(wrapper.state().activeMoodDay).toBe(moodDay.props().date);
        };
    });

    it ('change active day mood value', () => {
        const wrapper = mount(<App />);
        const { activeMoodDay } = wrapper.state();
        const moodSelector = wrapper.find('MoodSelector');
        
        [5, 4, 3, 2, 1, 0].map((value) =>{
            moodSelector.find('div').at(value).simulate('click');
            expect(wrapper.state().days[activeMoodDay]).toEqual(value);
        });
    });

    it('saves data to localStorage', () => {
        const wrapper = mount(<App />);
        wrapper.setState({days: moodCalendarMockData});
        expect(JSON.parse(window.localStorage.getItem('moodCalendar'))).toEqual(moodCalendarMockData);
    });

    it('load data from localStorage', () => {
        window.localStorage.setItem('moodCalendar', JSON.stringify(moodCalendarMockData));
        const wrapper = mount(<App />);
        expect(wrapper.state().days).toEqual(moodCalendarMockData);
    });

    it('loadState must return null if JSON.parse throw an error', () => {
        const wrapper = mount(<App />);

        window.localStorage.setItem('moodCalendar', null);
        expect(wrapper.instance().loadState()).toEqual(null);

        window.localStorage.setItem('moodCalendar', 'random_garbage');
        expect(wrapper.instance().loadState()).toEqual(null);        
    });

});

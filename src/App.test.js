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
window.localStorage = global.localStorage;

import mockdate from 'mockdate';

import { currDayIndex } from './helpers';
import { days, daysInitialState, daysFillData } from '../fixtures/moodCalendarMockData';

beforeEach(() => {
    window.localStorage.clear();
});

describe('<App />', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    });

    it('starts with current date as active day', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().activeMoodDay).toEqual(currDayIndex());
    });

    it('initial state is empty', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().days).toEqual(daysInitialState);
    });

    it('change active day on click', () => {
        const wrapper = mount(<App />);
        {
            const moodDay = wrapper.find('MoodDay').at(0);
            moodDay.find('button').simulate('click');
            expect(wrapper.state().activeMoodDay).toEqual(moodDay.props().day);
        };
        {
            const moodDay = wrapper.find('MoodDay').at(1);
            moodDay.find('button').simulate('click');
            expect(wrapper.state().activeMoodDay).toEqual(moodDay.props().day);
        };
    });

    it('change active day mood value', () => {
        mockdate.set('2018/1/1');
        const wrapper = shallow(<App />);
        wrapper.instance().changeDateMoodValue(5);
        const {days, activeMoodDay} = wrapper.state()
        expect(days[activeMoodDay]).toEqual(5);
    });

    it('change active day mood value on click', () => {
        const wrapper = mount(<App />);
        const { activeMoodDay } = wrapper.state();
        const moodSelector = wrapper.find('MoodSelector');

        [5, 4, 3, 2, 1, 0].map((value) => {
            moodSelector.find('div').at(value).simulate('click');
            expect(wrapper.state().days[activeMoodDay]).toEqual(value);
        });
    });

    // it('number of MoodDay is correct', () => {
    //     fail('test not implemented');
    // });
});

describe('dialogs', () => {

    it('has no dialog open on start', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('ImportDialog').length).toEqual(0);
        expect(wrapper.find('ExportDialog').length).toEqual(0);
        expect(wrapper.find('AboutDialog').length).toEqual(0);
    });

    it('opens dialogs', () => {
        const wrapper = mount(<App />);

        const importLink = wrapper.find('[data-menu="import"]');
        importLink.simulate('click');
        expect(wrapper.find('ImportDialog').length).toEqual(1);

        const exportLink = wrapper.find('[data-menu="export"]');
        exportLink.simulate('click');
        expect(wrapper.find('ExportDialog').length).toEqual(1);

        const aboutLink = wrapper.find('[data-menu="about"]');
        aboutLink.simulate('click');
        expect(wrapper.find('AboutDialog').length).toEqual(1);
    });

    it('closes dialogs', () => {
        const wrapper = mount(<App enableAnimations={false} />);

        const importLink = wrapper.find('[data-menu="import"]');
        importLink.simulate('click');
        const importDialogCloseButton = wrapper.find('ImportDialog .dialog .close');
        importDialogCloseButton.simulate('click');
        expect(wrapper.find('ImportDialog').length).toEqual(0);

        const exportLink = wrapper.find('[data-menu="export"]');
        exportLink.simulate('click');
        const exportDialogCloseButton = wrapper.find('ExportDialog .dialog .close');
        exportDialogCloseButton.simulate('click');
        expect(wrapper.find('ExportDialog').length).toEqual(0);

        const aboutLink = wrapper.find('[data-menu="about"]');
        aboutLink.simulate('click');
        const aboutDialogCloseButton = wrapper.find('AboutDialog .dialog .close');
        aboutDialogCloseButton.simulate('click');
        expect(wrapper.find('AboutDialog').length).toEqual(0);

    });
});

describe('loading demo data', () => {

    it('should fill the days with random data', () => {
        global.Math.random = jest.fn().mockReturnValue(0.5);
        global.confirm = jest.fn().mockReturnValue(true);

        const wrapper = mount(<App />);
        const demoDataLink = wrapper.find('[data-menu="demo"]');
        demoDataLink.simulate('click');

        expect(wrapper.state().days).toEqual(daysFillData);
    });

    it('should not fill the days with random data if the user do not confirm', () => {
        global.Math.random = jest.fn().mockReturnValue(0.5);
        global.confirm = jest.fn().mockReturnValue(false);

        const wrapper = mount(<App />);
        const demoDataLink = wrapper.find('[data-menu="demo"]');
        demoDataLink.simulate('click');

        expect(wrapper.state().days).not.toEqual(daysFillData);
    });

});

describe('save and load data', () => {

    it('saves data to localStorage', () => {
        const wrapper = mount(<App />);
        wrapper.setState({ days: days });
        expect(JSON.parse(window.localStorage.getItem('moodCalendar'))).toEqual(days);
    });

    it('load data from localStorage', () => {
        window.localStorage.setItem('moodCalendar', JSON.stringify(days));
        const wrapper = mount(<App />);
        expect(wrapper.state().days).toEqual(days);
    });

    it('loadState must return null if JSON.parse throw an error', () => {
        const wrapper = mount(<App />);

        window.localStorage.setItem('moodCalendar', null);
        expect(wrapper.instance().loadState()).toEqual(null);

        window.localStorage.setItem('moodCalendar', 'random_garbage');
        expect(wrapper.instance().loadState()).toEqual(null);
    });

});

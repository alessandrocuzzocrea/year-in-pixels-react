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

import {days} from '../fixtures/moodCalendarMockData';


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
        wrapper.setState({days: days});
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

    // it('number of MoodDay is correct', () => {
    //     fail('test not implemented');
    // });

});

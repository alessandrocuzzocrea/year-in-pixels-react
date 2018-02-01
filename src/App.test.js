import React from 'react';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage;

import mockdate from 'mockdate';

import consts from './consts';
import { dayIndex, currDayIndex } from './helpers';
import { days, daysInitialState, daysString } from '../fixtures/moodCalendarMockData';

describe('<App />', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    });

    it('days are correctly initialized', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().days).toEqual(daysInitialState);
    });

    it('starts with current date as active day', () => {
        mockdate.set('2018/1/1');
        const wrapper = shallow(<App />);
        expect(wrapper.state().activeMoodDay).toEqual(currDayIndex());
    });

    it('changes active day', () => {
        mockdate.set('2018/1/1');
        const wrapper = shallow(<App />);
        const initialActiveMoodDay = wrapper.state().activeMoodDay;
        const newActiveMoodDay = dayIndex(2018, 0, 2);
        wrapper.instance().changeActiveMoodDay(newActiveMoodDay);
        expect(wrapper.state().activeMoodDay).toEqual(newActiveMoodDay);
    });

    it('changes active day mood value', () => {
        mockdate.set('2018/1/1');
        const wrapper = shallow(<App />);
        wrapper.instance().changeDateMoodValue(5);
        const { days, activeMoodDay } = wrapper.state()
        expect(days[activeMoodDay]).toEqual(5);
    });


});

describe('dialogs', () => {

    it('has no dialog open on start', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('ImportDialog').length).toEqual(0);
        expect(wrapper.find('ExportDialog').length).toEqual(0);
        expect(wrapper.find('AboutDialog').length).toEqual(0);
    });

    it('sets state.openDialog value correctly', () => {
        const wrapper = shallow(<App />);

        Object.keys(consts.dialogs).forEach((val) => {
            wrapper.instance().openDialog(consts.dialogs.import);
            expect(wrapper.state().openDialog).toEqual(consts.dialogs.import);
        });
    });
});

describe('loading demo data', () => {


});

describe('save and load data', () => {

    beforeEach(() => {
        window.localStorage.clear();
    });

    it('saves data to localStorage', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ days: days });
        expect(JSON.parse(window.localStorage.getItem('moodCalendar'))).toEqual(days);
    });

    it('load data from localStorage', () => {
        window.localStorage.setItem('moodCalendar', JSON.stringify(days));
        const wrapper = shallow(<App />);
        expect(wrapper.state().days).toEqual(days);
    });

    it('loadState must return null if JSON.parse throw an error', () => {
        const wrapper = shallow(<App />);

        window.localStorage.setItem('moodCalendar', null);
        expect(wrapper.instance().loadState()).toEqual(null);

        window.localStorage.setItem('moodCalendar', 'random_garbage');
        expect(wrapper.instance().loadState()).toEqual(null);
    });

});

describe('clear data', () => {

    it('clears data', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ days: days });
        expect(wrapper.state().days).not.toEqual(daysInitialState);
        wrapper.instance().clearData();
        expect(wrapper.state().days).toEqual(daysInitialState);
    });

    it('asks for confirmation before clearing the data', () => {
        const confirmSpy = jest.spyOn(global, 'confirm');
        const wrapper = shallow(<App />);

        wrapper.instance().askClearDataConfirm();
        expect(confirmSpy).toHaveBeenCalledWith(consts.clearDataMsg);

        confirmSpy.mockRestore();
    });
});

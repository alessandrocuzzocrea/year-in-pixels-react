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


it('has no dialog open on start', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ImportDialog').length).toEqual(0);
    expect(wrapper.find('ExportDialog').length).toEqual(0);
    expect(wrapper.find('AboutDialog').length).toEqual(0);
});

describe('openDialog', () => {
    it('sets state.openDialog value correctly', () => {
        const wrapper = shallow(<App />);

        Object.keys(consts.dialogs).forEach((val) => {
            wrapper.instance().openDialog(consts.dialogs.import);
            expect(wrapper.state().openDialog).toEqual(consts.dialogs.import);
        });
    });
});

describe('closeDialog', () => {
    it('sets state.openDialog to null', () => {
        const wrapper = shallow(<App />);

        wrapper.instance().openDialog(consts.dialogs.import);
        expect(wrapper.state().openDialog).toEqual(consts.dialogs.import);

        wrapper.instance().closeDialog();
        expect(wrapper.state().openDialog).toEqual(null);
    });
});

describe('askDemoDataConfirm', () => {

    let confirmSpy;

    beforeEach(() => {
        confirmSpy = jest.spyOn(global, 'confirm');
    });

    afterEach(() => {
        confirmSpy.mockRestore();
    });

    it('asks for confirmation', () => {
        const wrapper = shallow(<App />);

        wrapper.instance().askDemoDataConfirm();
        expect(confirmSpy).toHaveBeenCalledWith(consts.clearDataMsg);
    });

    it('calls fillDemoData if confirm', () => {
        const wrapper = shallow(<App />);

        const fillDemoDataSpy = jest.spyOn(wrapper.instance(), 'fillDemoData');
        confirmSpy.mockReturnValue(true);

        wrapper.instance().askDemoDataConfirm();
        expect(fillDemoDataSpy).toHaveBeenCalled();

        fillDemoDataSpy.mockReset();
    });

    it('does not call fillDemoData if not confirm', () => {
        const wrapper = shallow(<App />);

        const fillDemoDataSpy = jest.spyOn(wrapper.instance(), 'fillDemoData');
        confirmSpy.mockReturnValue(false);

        wrapper.instance().askDemoDataConfirm();
        expect(fillDemoDataSpy).not.toHaveBeenCalled();

        fillDemoDataSpy.mockReset();
    });
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

describe('askClearDataConfirm', () => {

    let confirmSpy;

    beforeEach(() => {
        confirmSpy = jest.spyOn(global, 'confirm');
    });

    afterEach(() => {
        confirmSpy.mockRestore();
    });

    it('asks for confirmation', () => {
        const wrapper = shallow(<App />);

        wrapper.instance().askClearDataConfirm();
        expect(confirmSpy).toHaveBeenCalledWith(consts.clearDataMsg);
    });

    it('calls clearData if confirm', () => {
        const wrapper = shallow(<App />);

        const clearDataSpy = jest.spyOn(wrapper.instance(), 'clearData');
        confirmSpy.mockReturnValue(true);

        wrapper.instance().askClearDataConfirm();
        expect(clearDataSpy).toHaveBeenCalled();

        clearDataSpy.mockReset();
    });

    it('does not call clearData if not confirm', () => {
        const wrapper = shallow(<App />);

        const clearDataSpy = jest.spyOn(wrapper.instance(), 'clearData');
        confirmSpy.mockReturnValue(false);

        wrapper.instance().askClearDataConfirm();
        expect(clearDataSpy).not.toHaveBeenCalled();

        clearDataSpy.mockReset();
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

describe('isImportValid', () => {

    it('validate correct import string', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.instance().isImportValid(daysString)).toEqual(true);
    });

    it('does not validate null input', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.instance().isImportValid(null)).toEqual(false);
    });

    it('does not validate input that does not match current year length', () => {
        mockdate.set('2018/1/1');

        const wrapper = shallow(<App />);
        expect(wrapper.instance().isImportValid('0123456')).toEqual(false);
    });

    it('does not validate input that contains any characters except 0123456', () => {

        const wrapper = shallow(<App />);
        const invalidDaysString = daysString.replace('3', 'z');
        expect(wrapper.instance().isImportValid(invalidDaysString)).toEqual(false);
    });
});

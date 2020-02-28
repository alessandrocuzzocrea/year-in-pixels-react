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
import helpers from './helpers';
import calendarMockData from '../fixtures/calendarMockData';

describe('<App />', () => {

    beforeEach(() => {
        window.localStorage.clear();
        mockdate.set(calendarMockData.currentDate);
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    });

    it('days are correctly initialized', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().days).toEqual(calendarMockData.daysInitialState);
    });

    it('starts with current date as active day', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().activeMoodDay).toEqual(helpers.currDayIndex());
    });

    it('changes active day', () => {
        const wrapper = shallow(<App />);
        const initialActiveMoodDay = wrapper.state().activeMoodDay;
        const newActiveMoodDay = helpers.dayIndex(2018, 0, 2);
        wrapper.instance().changeActiveMoodDay(newActiveMoodDay);
        expect(wrapper.state().activeMoodDay).toEqual(newActiveMoodDay);
    });

    it('changes active day mood value', () => {
        const wrapper = shallow(<App />);
        wrapper.instance().changeDateMoodValue(5);
        const { days, activeMoodDay } = wrapper.state()
        expect(days[activeMoodDay]).toEqual(5);
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

        it('saves data to localStorage', () => {
            const wrapper = shallow(<App />);
            wrapper.setState({ days: calendarMockData.days });
            expect(JSON.parse(window.localStorage.getItem('moodCalendar'))).toEqual(calendarMockData.days);
        });

        it('load data from localStorage', () => {
            window.localStorage.setItem('moodCalendar', JSON.stringify(calendarMockData.days));
            const wrapper = shallow(<App />);
            expect(wrapper.state().days).toEqual(calendarMockData.days);
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
            wrapper.setState({ days: calendarMockData.days });
            expect(wrapper.state().days).not.toEqual(calendarMockData.daysInitialState);
            wrapper.instance().clearData();
            expect(wrapper.state().days).toEqual(calendarMockData.daysInitialState);
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
            expect(wrapper.instance().isImportValid(calendarMockData.daysString)).toEqual(true);
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
            const invalidDaysString = calendarMockData.daysString.replace('3', 'z');
            expect(wrapper.instance().isImportValid(invalidDaysString)).toEqual(false);
        });
    });

    describe('importData', () => {

        it('calls isImportValid', () => {
            const wrapper = shallow(<App />);

            const mockIsImportValid = jest.spyOn(wrapper.instance(), 'isImportValid');
            wrapper.instance().importData(calendarMockData.daysString);
            expect(mockIsImportValid).toHaveBeenCalled();
            mockIsImportValid.mockRestore();
        });

        it('asks for confirmation before setting the state', () => {
            const confirmSpy = jest.spyOn(global, 'confirm');
            const wrapper = shallow(<App />);

            wrapper.instance().importData(calendarMockData.daysString);
            expect(confirmSpy).toHaveBeenCalledWith(consts.clearDataMsg);

            confirmSpy.mockRestore();
        });

        it('sets the state correctly', () => {
            const wrapper = shallow(<App />);
            const confirmSpy = jest.spyOn(global, 'confirm').mockReturnValue(true);

            expect(wrapper.state().days).not.toEqual(calendarMockData.days);

            wrapper.instance().importData(calendarMockData.daysString);
            expect(wrapper.state().days).toEqual(calendarMockData.days);

            confirmSpy.mockRestore();
        });

        it('calls closeDialog if the import was successful', () => {
            const wrapper = shallow(<App />);

            const confirmSpy = jest.spyOn(global, 'confirm').mockReturnValue(true);
            const closeDialogSpy = jest.spyOn(wrapper.instance(), 'closeDialog');

            expect(wrapper.state().days).not.toEqual(calendarMockData.days);

            wrapper.instance().importData(calendarMockData.daysString);
            expect(closeDialogSpy).toHaveBeenCalled();

            confirmSpy.mockRestore();
            closeDialogSpy.mockRestore();
        });

        it('displays an alert if the import was unsuccessful', () => {
            const wrapper = shallow(<App />);

            const alertSpy = jest.spyOn(global, 'alert');

            wrapper.instance().importData(null);
            expect(alertSpy).toHaveBeenCalledWith(consts.importErrorMsg);

            alertSpy.mockRestore();
        });

        it('does not change the state import was unsuccessful', () => {
            const wrapper = shallow(<App />);
            wrapper.setState({ days: calendarMockData.days });
            expect(wrapper.state().days).not.toEqual(calendarMockData.daysInitialState);

            const alertSpy = jest.spyOn(global, 'alert').mockReturnValue(true);
            wrapper.instance().importData(calendarMockData.daysString);

            expect(wrapper.state().days).toEqual(calendarMockData.days);

            alertSpy.mockRestore();
        });
    });
});

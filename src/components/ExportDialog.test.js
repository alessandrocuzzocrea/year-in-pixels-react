import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { days, daysString, noOfDays } from '../../fixtures/calendarMockData';

import ExportDialog, { daysToString } from './ExportDialog';

describe('<ExportDialog />', () => {

    it('works correctly', () => {

        const wrapper = shallow(
            <ExportDialog
                days={days}
                closeDialog={() => { }}
            />
        );
    });

    it('selects textarea on click', () => {

        const wrapper = mount(
            <ExportDialog
                days={days}
                closeDialog={() => { }}
            />
        );

        const textArea = wrapper.find('textarea');

        expect(textArea.instance().selectionStart).toEqual(0);
        expect(textArea.instance().selectionEnd).toEqual(0);

        textArea.simulate('click');

        expect(textArea.instance().selectionStart).toEqual(0);
        expect(textArea.instance().selectionEnd).toEqual(noOfDays);
    });
});

describe('daysToString', () => {

    it('converts days object to string', () => {
        expect(daysToString(days)).toEqual(daysString);
    });
});

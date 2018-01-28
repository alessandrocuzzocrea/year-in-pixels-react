import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { days, daysString, noOfDays } from '../../fixtures/moodCalendarMockData';

import ExportDialog from './ExportDialog';

describe('<ExportDialog />', () => {

    it('works correctly', () => {

        const mockFn = jest.fn();

        const wrapper = shallow(
            <ExportDialog
                days={days}
                closeDialog={mockFn}
            />
        );
    });

    it('convert days object to string', () => {

        const wrapper = shallow(
            <ExportDialog
                days={days}
                closeDialog={jest.fn()}
            />
        );

        expect(wrapper.instance().daysToString(days)).toEqual(daysString);
    });

    it('select textarea on click', () => {

        const wrapper = mount(
            <ExportDialog
                days={days}
                closeDialog={jest.fn()}
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

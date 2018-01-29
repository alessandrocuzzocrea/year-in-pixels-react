import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { daysString } from '../../fixtures/moodCalendarMockData';

import ImportDialog from './ImportDialog';

describe('<ImportDialog />', () => {

    it('works correctly', () => {

        const fn = () => { };

        const wrapper = shallow(
            <ImportDialog
                importData={fn}
                closeDialog={fn}
            />);
    });

    it('calls fn with right argument', () => {

        const importDataMock = jest.fn();

        const wrapper = mount(
            <ImportDialog
                importData={importDataMock}
                closeDialog={() => { }}
            />);

        const importDialogTextArea = wrapper.find('textarea');
        importDialogTextArea.instance().value = daysString;

        const importDialogOkButton = wrapper.find('button');
        importDialogOkButton.simulate('click');

        expect(importDataMock.mock.calls[0][0]).toEqual(daysString);
    });
});

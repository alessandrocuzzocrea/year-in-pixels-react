import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import moodCalendarMockData from '../../fixtures/moodCalendarMockData';

import ExportDialog from './ExportDialog';

describe('<ExportDialog />', () => {

    it('works correctly', () => {

        const mockFn = jest.fn();

        const wrapper = shallow(
            <ExportDialog
                days={moodCalendarMockData}
                closeDialog={mockFn}
            />
        );
    });
});

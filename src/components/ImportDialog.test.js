import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import ImportDialog from './ImportDialog';

describe('<ImportDialog />', () => {

    it('works correctly', () => {

        const mockFn = jest.fn();

        const wrapper = shallow(
            <ImportDialog
                importData={mockFn}
                closeDialog={mockFn}
            />
        );
    });
});

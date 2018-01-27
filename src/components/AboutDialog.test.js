import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import AboutDialog from './AboutDialog';


describe('<AboutDialog />', () => {

    it('works correctly', () => {
        const wrapper = shallow(<AboutDialog />);
    });

});

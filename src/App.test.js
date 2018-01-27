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

describe('<App />', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    });
});

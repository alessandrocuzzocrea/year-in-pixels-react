import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

var fetchMock = require('fetch-mock');
var { qodResponseMock, quoteMock, quoteErrorMock } = require('../../fixtures/qodMockData');

import { QuotesRESTAPIUrl } from '../consts';

import QuoteOfTheDay from './QuoteOfTheDay';

describe('<QuoteOfTheDay />', () => {

    beforeEach(() => {
        fetchMock.restore();
    });

    it('works correctly', () => {
        const wrapper = shallow(<QuoteOfTheDay />);
    });

    it('returns a quote fetched from Quotes REST API', () => {
        fetchMock.get(QuotesRESTAPIUrl, qodResponseMock);
        const wrapper = shallow(<QuoteOfTheDay />);
        return wrapper.instance().getQuote().then(quote => expect(quote).toEqual(quoteMock));
    });

    it('returns the default quote if an error was thrown', () => {
        fetchMock.get(QuotesRESTAPIUrl, { throws: '429 (Too Many Requests)' });
        const wrapper = shallow(<QuoteOfTheDay />);
        return wrapper.instance().getQuote().then(quote => expect(quote).toEqual(quoteErrorMock));
    });
});

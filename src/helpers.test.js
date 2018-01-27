import helpers from './helpers';

describe('helpers', () => {

    it('return 365 if regular year', () => {
        expect(helpers.daysInYear(2018)).toEqual(365);
    });

    it('return 366 if leap year', () => {
        expect(helpers.daysInYear(2020)).toEqual(366);
    });

    it('return the right number of days', () => {
        expect(helpers.daysInMonth(2018, 0)).toEqual(31);
        expect(helpers.daysInMonth(2018, 1)).toEqual(28);
        expect(helpers.daysInMonth(2018, 2)).toEqual(31);
        expect(helpers.daysInMonth(2018, 3)).toEqual(30);
        expect(helpers.daysInMonth(2018, 4)).toEqual(31);
        expect(helpers.daysInMonth(2018, 5)).toEqual(30);
        expect(helpers.daysInMonth(2018, 6)).toEqual(31);
        expect(helpers.daysInMonth(2018, 7)).toEqual(31);
        expect(helpers.daysInMonth(2018, 8)).toEqual(30);
        expect(helpers.daysInMonth(2018, 9)).toEqual(31);
        expect(helpers.daysInMonth(2018, 10)).toEqual(30);
        expect(helpers.daysInMonth(2018, 11)).toEqual(31);
    })
});

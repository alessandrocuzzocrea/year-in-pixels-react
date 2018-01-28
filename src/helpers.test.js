import mockdate from 'mockdate';

import {
    daysInYear,
    daysInMonth,
    dayIndex,
    currDayIndex,
    currYear,
    dayToMonth,
} from './helpers';

describe('daysInYear', () => {

    it('returns 365 if regular year', () => {
        expect(daysInYear(2018)).toEqual(365);
    });

    it('returns 366 if leap year', () => {
        expect(daysInYear(2020)).toEqual(366);
    });

});

describe('daysInMonth', () => {

    it('returns the right number of days', () => {

        expect(daysInMonth(2018, 1)).toEqual(28);
        expect(daysInMonth(2018, 2)).toEqual(31);
        expect(daysInMonth(2018, 3)).toEqual(30);
        expect(daysInMonth(2018, 4)).toEqual(31);
        expect(daysInMonth(2018, 5)).toEqual(30);
        expect(daysInMonth(2018, 6)).toEqual(31);
        expect(daysInMonth(2018, 7)).toEqual(31);
        expect(daysInMonth(2018, 8)).toEqual(30);
        expect(daysInMonth(2018, 9)).toEqual(31);
        expect(daysInMonth(2018, 10)).toEqual(30);
        expect(daysInMonth(2018, 11)).toEqual(31);
    });

});

describe('dayIndex', () => {

    it('returns the right day index', () => {

        let nextYear = new Date(2019, 0, 1);
        let i = 0;
        for (let d = new Date(2018, 0, 1); d < nextYear; d.setDate(d.getDate() + 1)) {
            expect(dayIndex(d.getFullYear(), d.getMonth(), d.getDate())).toEqual(i);
            i++;
        };
    });

    it('returns the current day index', () => {

        mockdate.set('2018/1/1');
        expect(currDayIndex()).toEqual(0);

        mockdate.set('2018/1/2');
        expect(currDayIndex()).toEqual(1);

        mockdate.set('2018/1/3');
        expect(currDayIndex()).not.toEqual(1);
    });
});

describe('currYear', () => {
    it('returns the current year', () => {

        mockdate.set('2018/1/1');
        expect(currYear()).toEqual(2018);

        mockdate.set('2019/1/2');
        expect(currYear()).toEqual(2019);

        mockdate.set('2020/1/3');
        expect(currYear()).toEqual(2020);
    });
});

describe('dayToMonth', () => {

    it('returns the current month', () => {

        [
            '2018',
            '2019',
            '2020'
        ]
            .forEach(v => {

                mockdate.set(`${v}/1/1`);
                const nextYear = new Date(currYear() + 1, 0, 1);
                let i = 0;
                for (let d = new Date(currYear(), 0, 1); d < nextYear; d.setDate(d.getDate() + 1)) {
                    const day = dayIndex(d.getFullYear(), d.getMonth(), d.getDate());
                    expect(dayToMonth(day)).toEqual(d.getMonth());
                    i++;
                };
            });
    });
});

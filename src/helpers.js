export function daysInYear(year) {
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        return 366;
    } else {
        return 365
    }
};

export function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export default {
    daysInYear: daysInYear,
    daysInMonth: daysInMonth,
};

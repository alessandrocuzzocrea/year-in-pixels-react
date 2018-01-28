export function daysInYear(year) {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return 366;
    } else {
        return 365
    }
};

export function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
};

export function dayIndex(year, month, day) {
    return Math.ceil((new Date(year, month, day) - new Date(year, 0, 1)) / 86400000);
}

export function currDayIndex() {
    const date = new Date();
    return dayIndex(date.getFullYear(), date.getMonth(), date.getDate());
}


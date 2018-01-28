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
};

export function currDayIndex() {
    const date = new Date();
    return dayIndex(date.getFullYear(), date.getMonth(), date.getDate());
};

export function currYear() {
    return new Date().getFullYear();
};

export function dayToMonth(day) {

    const nextYear = new Date(currYear() + 1, 0, 1);
    let i = 0;
    for (let d = new Date(currYear(), 0, 1); d < nextYear; d.setDate(d.getDate() + 1)) {
        if (day === dayIndex(d.getFullYear(), d.getMonth(), d.getDate())) {
            return d.getMonth();
        };
        i++;
    };
};

function daysInYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 366;
  } else {
    return 365;
  }
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function dayIndex(year, month, day) {
  return Math.ceil(
    (new Date(year, month, day) - new Date(year, 0, 1)) / 86400000
  );
}

function currDayIndex() {
  const date = new Date();
  return dayIndex(date.getFullYear(), date.getMonth(), date.getDate());
}

function currYear() {
  return new Date().getFullYear();
}

function dayToMonthMemo(day) {
  let year = currYear();
  let cache = {};

  return day => {
    if (year !== new Date().getFullYear()) {
      year = new Date().getFullYear();
      cache = {};
    }
    if (day in cache) return cache[day];
    const nextYear = new Date(year + 1, 0, 1);
    for (
      let d = new Date(year, 0, 1);
      d < nextYear;
      d.setDate(d.getDate() + 1)
    ) {
      if (day === dayIndex(d.getFullYear(), d.getMonth(), d.getDate())) {
        cache[day] = d.getMonth();
        return cache[day];
      }
    }
  };
}

const dayToMonth = dayToMonthMemo();

module.exports = {
  daysInYear,
  daysInMonth,
  dayIndex,
  currDayIndex,
  currYear,
  dayToMonthMemo,
  dayToMonth
};

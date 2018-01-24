const helpers = {};

helpers.noOfDays = (year, month) => {
    return new Date(year, month+1, 0).getDate();
};

export default helpers;
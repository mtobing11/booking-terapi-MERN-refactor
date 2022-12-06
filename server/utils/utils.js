export const formatDate = (date, arrFormat) => {
    let d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

        let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        let newDate;
        switch (arrFormat) {
            case 'dmmmy':{
                newDate = [day, monthName[month], year].join(' ');
                return new Date(newDate)
            }
            default: {
                newDate = [year, Number(month)+1, day].join('-')
                return new Date(newDate)
            }
        }
}

// check how many times already booked
export const checkPhoneLimit = (dateData, cellphone) => {
    let count = 0;
    let shiftLength = dateData.shifts;

    for (let i = 0; i < shiftLength; i++) {
        let currShift = dateData[`customersShift${i+1}`]
        currShift.map((cust) => {
            if(cellphone == cust.cellphone){ count++ }
        })
    }

    if(count >= dateData.bookingLimit) return false;
    return true;
}

// check capacity shift
export const checkCapacity = (dateData, shift) => {
    let shiftDestination = `customersShift${shift}`;

    if(dateData.capacity > dateData[shiftDestination].length){
        return true;
    }
    return false;
}

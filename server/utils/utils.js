export const formatDate = (date, arrFormat) => {
    function addZeroToDate(num){
        if (num <=9){
            return "0" + num;
        }
        return num
    }

    let d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = addZeroToDate(d.getHours()),
        minute = addZeroToDate(d.getMinutes()),
        second = addZeroToDate(d.getSeconds())

        let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        let newDate;
        switch (arrFormat) {
            case 'dmmmy':{
                newDate = [day, monthName[month], year].join(' ');
                return new Date(newDate)
            }
             case 'ymd-fulltime': {
                let formatDate = [year, month, day].join("-");
                let formatTime = [hour, minute, second].join(":");
                return [formatDate, formatTime].join(' ');
            }
            default: {
                newDate = [year, Number(month)+1, day].join('-')
                return new Date(newDate)
            }
        }
}

// get tomorrow date
export const getTomorrowDate = () => {
    let today = new Date();
    today.setDate(today.getDate()+1);

    let nextDay = formatDate(today);
    return nextDay;
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
// find the bookingid
export const getBookingIdInArr = (oldArr, newArr) => {
    let bookId = []
    
    newArr.map((id) => {
        if(oldArr.indexOf(id) < 0){
            bookId.push(id)
        }
    })
    return bookId;
}

// find the bookingid
export const getBookingId = (arrBookId, dateObj, cellphone) => {
    let findData = []
    let findIndex = [];
    let shiftLength = dateObj.shifts;
    
    for(let i = 0; i < shiftLength; i++) {
        let shiftNum = i + 1
        let currShift = dateObj[`customersShift${shiftNum}`];
        
        for (let j = 0; j < arrBookId.length; j++){
            let tempArrBookingId =currShift.map((cust) => cust._id.toString());
            let tempIndex = tempArrBookingId.indexOf(arrBookId[j]);
            
            if(tempIndex > -1){
                findIndex.push(tempIndex);
                findData.push(currShift[tempIndex]);
            }
        }
    }

    if(findIndex.length > 0){
        return [findIndex, findData]
    }
    return [null, null]
}

// sort an array of objects
export const sortArrOfObjects = (arr, prop) => {
    let newArr = [...arr];
    
    function compare(a, b){
        let dateA = new Date(a[prop]);
        let dateB = new Date(b[prop]);

        if (dateA < dateB){
            return -1
        }
        if (dateA > dateB){
            return 1
        }
        return 0
    }

    return newArr.sort(compare)
}

// find the bookingid
// export const getBookingId = (bookingId, dateObj) => {
//     let findData;
//     let findIndex = -1;
//     let shiftLength = dateObj.shifts;
//     let shift1 = [], shift2 = [], shift3 = [];
    
//     for(let i = 0; i < shiftLength; i++) {
//         let shiftNum = i + 1
//         let currShift = dateObj[`customersShift${shiftNum}`];
        
//         let tempArrBookingId =currShift.map((cust) => cust._id.toString());
//         let tempIndex = tempArrBookingId.indexOf(bookingId)

//         if(tempIndex > -1){
//             findIndex = tempIndex;
//             findData = currShift[tempIndex];
//         }
//     }

//     if(findIndex > -1){
//         return [findIndex, findData]
//     }
//     return [null, null]
// }



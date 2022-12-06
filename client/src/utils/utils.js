// sort the dates
export const sortDateArr = (arr, prop) => {
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

// format the date
export const formattingDate = (date, arrFormat) => {
    function addZeroToDate(num){
        if (num <=9){
            return "0" + num;
        }
        return num
    }

    function formatDateSub(date, arrFormat){
        let day = addZeroToDate(date.getDate()),
            month = addZeroToDate(date.getMonth() + 1),
            year = date.getFullYear(), 
            dayIndex = date.getDay(),
            hour = addZeroToDate(date.getHours()),
            minute = addZeroToDate(date.getMinutes()),
            second = addZeroToDate(date.getSeconds())
            
        // let millisecond = date.getMilliseconds();

        let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agst', 'Sep', 'Okt', 'Nov', 'Des'];
        let dayNameInIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        switch (arrFormat) {
            case 'ymd':
                return [year, month, day].join('-')
            case 'ymd-time': {
                let formatDate = [year, month, day].join("-");
                let formatTime = [hour, minute, second].join(":");
                return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
            }
            case 'dmmy':
                return [day, monthName[month-1], year].join(' ');
            case 'dmmy-time': {
                    let formatDate = [day, monthName[month-1], year].join("-");
                    return [dayNameInIndonesia[dayIndex], formatDate].join(' ');
                }
            default: {
                let formatDate = [day, month, year].join("-");
                let formatTime = [hour, minute, second].join(":");
                return [formatDate, formatTime, dayNameInIndonesia[dayIndex]].join(' ');
            }
        }
        
    }

    return formatDateSub(date, arrFormat)
}

// adjust status shifts in a array
export const setupShitsStatus = (shiftNum, maxShift) => {
    let arr = []
    for (let i = 0; i < maxShift; i++){
        i < shiftNum ? arr.push(true) : arr.push(false);
    }
    return arr;
}

// cut schedules array if necessary
export const cutArray = (arr, numLength) => {
    let newArr = [...arr];
    if (arr.length > numLength){
        newArr.splice(numLength)
    }
    return newArr;
}

// find the right date
export const findDate = ( exactDate, arrDate ) => {
    let dateToFind = formattingDate(exactDate, 'ymd');
    let tempArr = [...arrDate];
    
    // tempArr.map((date) => console.log(formattingDate(new Date((date.openDate)), 'ymd')));
    let findDateData = tempArr.filter((obj) => dateToFind === formattingDate(new Date((obj.openDate)), 'ymd'));

    return findDateData
}

// find date index
export const findDateIndex = ( exactDate, arrDate ) => {
    let dateToFind = formattingDate(exactDate, 'ymd');
    let tempArr = [...arrDate];
    
    let dateArr = tempArr.map((obj) => formattingDate(new Date((obj.openDate)), 'ymd'));
    let dateIndex = dateArr.indexOf(dateToFind)

    return dateIndex
}

// make new array of objects
export const makeNewArrObject = (oldArr, goalArr, date, shift) => {

    let arr = oldArr.map((cust, idx) => {
        
        function newArr(obj){
            return goalArr.map((val) => obj[val])
        }
        
        let tempArr = newArr(cust)
        let formattedDate = formattingDate(new Date(date), 'dmmy')
        
        return [formattedDate, tempArr[0], tempArr[1], shift, idx+1, formattingDate(new Date(tempArr[2]))]
    })

    return arr;
}
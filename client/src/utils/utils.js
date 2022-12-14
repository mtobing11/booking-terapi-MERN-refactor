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

// phone validator
export const phoneValidator = (phone) => {

    const standardizePhoneNumber = (phone) => {
        let phoneNumber = String(phone).trim();

        if(phoneNumber.startsWith('+62')){
            phoneNumber = '0' + phoneNumber.slice(3);
        } else if (phoneNumber.startsWith('62')){
            phoneNumber = '0' + phoneNumber.slice(2)
        }

        return phoneNumber.replace(/[- .]/g, "");
    }

    const isCorrectFormat = (phone) => {
        if(!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)){
            return false
        }
        return true
    }

    const cellularProviderInIndonesia = (phone) =>{
        const prefix = phone.slice(0, 4);
        if (['0831', '0832', '0833', '0838'].includes(prefix)) return 'axis';
        if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) return 'three';
        if (['0817', '0818', '0819', '0859', '0878', '0877'].includes(prefix)) return 'xl';
        if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) return 'indosat';
        if (['0812', '0813', '0852', '0853', '0821', '0823', '0822', '0851', '0811'].includes(prefix)) return 'telkomsel';
        if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) return 'smartfren';
        if (['0840'].includes(prefix)) return 'untuk_percobaan';
        return null;
    }

    let standardNumber = standardizePhoneNumber(phone)
    if (isCorrectFormat(standardNumber) && cellularProviderInIndonesia(standardNumber)){
        return standardNumber
    }

    return null
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
export const findDate = ( arrDate, isToday=true ) => {
    let dateToFind = formattingDate(new Date(), 'ymd');
    let tempArr = [...arrDate];
    let findDateData;

    if(isToday){
        findDateData = tempArr.filter((obj) => dateToFind === formattingDate(new Date((obj.openDate)), 'ymd'));
    } else {
        let tempDateArr = tempArr.filter((obj) => dateToFind < formattingDate(new Date((obj.openDate)), 'ymd'));
        if(tempDateArr.length > 0){
            findDateData = [...tempDateArr]
        } else {
            findDateData = tempArr.filter((obj) => dateToFind === formattingDate(new Date((obj.openDate)), 'ymd'));
        }
    }

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
        
        let tempArr = newArr(cust)
        let formattedDate = formattingDate(new Date(date), 'dmmy')
        
        return [formattedDate, tempArr[0], tempArr[1], shift, idx+1, formattingDate(new Date(tempArr[2]))]
    })
    
    function newArr(obj){
        let temporaryArr = goalArr.map((val) => obj[val])
        return temporaryArr
    }

    return arr;
}
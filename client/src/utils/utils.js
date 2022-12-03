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
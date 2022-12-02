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

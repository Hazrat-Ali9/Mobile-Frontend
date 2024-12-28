// Use Data
const useDate = () => {
    const d = new Date()
    let month = d.getMonth()
    let year = d.getFullYear()
    let day =  d.getDate()
    let min = d.getMinutes()
    let sec = d.getSeconds()
    let hour = d.getHours()

    if (month === 0) {
        month = 'January'
    }
    else if(month === 1){
        month = 'February'
    }
    else if(month === 2){
        month = 'March'
    }
    else if(month === 3){
        month = 'April'
    }
    else if(month === 4){
        month = 'May'
    }
    else if(month === 5){
        month = 'June'
    }
    else if(month === 6){
        month = 'July'
    }
    else if(month === 7){
        month = 'August'
    }
    else if(month === 8){
        month = 'September'
    }
    else if(month === 9){
        month = 'October'
    }
    else if(month === 10){
        month = 'November'
    }
    else if(month === 11){
        month = 'December'
    }
    if(hour === 0){
        hour = 12
    }
    if(hour > 12){
        hour = hour - 12
    }
    
    const dateToday = `${day} ${month} ${year} ||  ${hour}h ${min}m ${sec}s`

    return [dateToday]
}

export default useDate
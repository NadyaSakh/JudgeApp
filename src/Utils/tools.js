export const getCurrentDay = () => {
    let dateString = ''
    let newDate = new Date()

    dateString += newDate.getFullYear() + '-'
    dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
    dateString += newDate.getDate()
    return dateString
}

export const getTime = () => {
    let timeString = ''
    let newDate = new Date()

    timeString += `0${newDate.getHours()}`.slice(-2) + ':'
    timeString += `0${newDate.getMinutes()}`.slice(-2) + ':'
    timeString += `0${newDate.getSeconds()}`.slice(-2)

    return timeString
}
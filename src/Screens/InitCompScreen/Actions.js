import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
    REQUEST_DAYS_PARTICIPANTS: 'REQUEST_DAYS_PARTICIPANTS',
    REQUEST_POINTS: 'REQUEST_POINTS',
    REQUEST_DAYS_PARTICIPANTS_FAIL: 'REQUEST_COMPETITION_FAIL',
    REQUEST_POINTS_FAIL: 'REQUEST_POINTS_FAIL'
}

export const requestCompetitionAction = () => ({
    type: Actions.REQUEST_COMPETITION
})

export const requestCompetitionEpic = action$ =>
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(() => {
            // Получение текущего соревнования:
            return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/current')
            // return ajax.getJSON('http://my-json-server.typicode.com/NadyaSakh/Weather-app1/currentCompetition/')

            //дни: надо получать айди из базы текущего соревнования
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/days/list?competitionId=2')

            //участники:
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/participants/list?page=0&size=0&competitionId=1&status=accepted')

            //Сейчас пока есть получение пунктов для конкретного дня соревноавния:
            //return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/points/list?competitionDayId=1')
                .timeout(5000)
                .mergeMap(response => {
                    LOG(response, 'Получен ответ')
                    if (response) {
                        return saveCompetition(response)
                        //получить айди текущего соревнования
                            .mergeMap(() => getCurrentCompetitionId())
                            .mergeMap((id) => {
                                //получить дни и участников, ТАКОЙ ЭКШН МОЖНО ПИСАТЬ?
                                requestDaysAndParticipantsAction(id)
                            })
                            .map(() => checkScanEnable(response))
                            .mergeMap(scanEnable => Observable.of(requestCompetitionSuccessAction(true, scanEnable)))// Нельзя скачать соревнование
                    }
                    else {
                        return Observable.of(requestCompetitionSuccessAction(false, false))
                    }
                })
                .catch(error => {
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        })

export const requestDaysAndParticipantsAction = id => ({
    type: Actions.REQUEST_DAYS_PARTICIPANTS,
    payload: {
        id: id
    }
})

export const requestDaysAndParticipantsEpic = action$ =>
    action$.ofType(Actions.REQUEST_DAYS_PARTICIPANTS)
        .mergeMap(action =>
            // Получение дней и участников текущего соревнования
            Observable.zip(
                getDaysList(action.payload.id),
                getParticipantsList(),
                (days, participants) => ({days, participants})
            ))
        .map(data => {
            //Сохранение дней и участников текущего соревнования
            saveCurrentCompetitionDays(data.days)
            saveCurrentCompetitionParticipants(data.participants)
        })


export const getCurrentCompetitionId = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionId')
                    observer.next(false)
                }
                else {
                    LOG('idSuccessfullyGetted', 'observer')
                    observer.next(currentCompetition.id)
                }

                observer.complete()
            })
    })
}

const saveCurrentCompetitionDays = response => {
    return Observable.create(observer => {
        AsyncStorage.setItem('currentCompetitionDays', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

const saveCurrentCompetitionParticipants = response => {
    return Observable.create(observer => {
        AsyncStorage.setItem('currentCompetitionParticipants', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

const getDaysList = id => {
    return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/days/list?competitionId=' + id)
        .timeout(5000)
        .mergeMap(response => {
            LOG(response, 'Получен список дней')
            if (response) {
                return response
            }
            else {
                return null //ЧТО ВОЗВРАЩАТЬ?
            }
        })
        .catch(error => {
            LOG(error, 'requestDays')
            return Observable.of(requestCompetitionFail())//Здесь доделать фэил дней
        })
}

const getParticipantsList = () => {
    return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/participants/list?page=0&size=0&competitionId=1&status=accepted')
        .timeout(5000)
        .mergeMap(response => {
            LOG(response, 'Получен список дней')
            if (response) {
                return response
            }
            else {
                return null //ЧТО ВОЗВРАЩАТЬ?
            }
        })
        .catch(error => {
            LOG(error, 'requestParticipants')
            return Observable.of(requestCompetitionFail())//Здесь доделать фэил участников
        })
}

const requestCompetitionSuccessAction = (competitionExists, scanEnable) => ({
    type: Actions.REQUEST_COMPETITION_SUCCESS,
    payload: {
        competitionExists,
        scanEnable
    }
})

const requestCompetitionFail = () => ({
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: 'Соревнования не загружены.'
    }
})

// const saveAndCheck = response => {
//     if (response) {
//         return saveCompetition(response)
//             .map(() => checkScanEnable(response))
//             .mergeMap(scanEnable => Observable.of(requestCompetitionSuccessAction(true, scanEnable)))// Нельзя скачать соревнование
//     }
//     else {
//         return Observable.of(requestCompetitionSuccessAction(false, false))
//     }
// }

const saveCompetition = response => {
    return Observable.create(observer => {
        AsyncStorage.setItem('currentCompetition', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

const checkScanEnable = response => {
    const currentDate = getCurrentDay()
    LOG(currentDate, 'currentDate')
    // LOG(response.dateBegin, 'begin')
    // LOG(response.dateFinish, 'finish')
    // let res = currentDate >= response.dateBegin && currentDate <= response.dateFinish

    LOG(response.dateStart, 'begin')
    LOG(response.dateFinish, 'finish')
    let res = (currentDate >= response.dateStart && currentDate <= response.dateFinish)
    LOG(res, 'result')
    return res
}

const getCurrentDay = () => {
    let dateString = ''
    let newDate = new Date()

    dateString += newDate.getFullYear() + '-'
    dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
    dateString += newDate.getDate()
    return dateString
}


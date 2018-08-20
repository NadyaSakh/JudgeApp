import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
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
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/current')
            return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/1')
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
                            .mergeMap(id => requestDaysAndParticipants(id))//получить дни и участников
                            .map(() => checkScanEnable(response))
                            .mergeMap(scanEnable => Observable.of(
                                requestCompetitionSuccessAction(true, scanEnable))
                            )
                    }
                    else {
                        return Observable.of(requestCompetitionSuccessAction(false, false))//Нельзя сканировать
                    }
                })
                .catch(error => {
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        })

export const requestDaysAndParticipants = id => {
    // Получение дней и участников текущего соревнования
    LOG('requestDaysAndParticipantsEpic', 'HERE!')
    return Observable.zip(
        getDaysAndPoints(id),
        getParticipantsList(),
        (daysAndPoints, participants) => ({daysAndPoints, participants})
    )
        .mergeMap(data => {
            LOG(data)
            //Сохранение дней и участников текущего соревнования
            return Observable.zip(
                saveCurrentCompetitionParticipants(data.participants),
                saveCurrentCompetitionPoints(data.daysAndPoints.points),
                saveCurrentCompetitionDays(data.daysAndPoints.days),
                () => {
                }
            )
        })
        .catch(error => {
            LOG(error, 'requestDaysAndPointsError')
            return Observable.of(requestCompetitionFail())//Здесь доделать фэил дней
        })
}

export const getCurrentCompetitionId = () => {
    return Observable.create(observer => {
        LOG('getCurrentCompetitionId', 'HERE!')
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionId')
                    observer.next(false)
                }
                else {
                    let parsedCompetition = JSON.parse(currentCompetition)
                    LOG(parsedCompetition, 'observer')
                    observer.next(parsedCompetition.id)
                }
                observer.complete()
            })
    })
}

const saveCurrentCompetitionDays = response => {
    return Observable.create(observer => {
        LOG('saveCurrentCompetitionDays', 'HERE!')
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
        LOG('saveCurrentCompetitionParticipants', 'HERE!')
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

const saveCurrentCompetitionPoints = response => {
    return Observable.create(observer => {
        LOG('saveCurrentCompetitionPoints', 'HERE!')
        AsyncStorage.setItem('currentCompetitionPoints', JSON.stringify(response), error => {
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

const getDaysAndPoints = id => {
    LOG(id, 'id: ')
    return ajax.getJSON(`https://afternoon-woodland-86438.herokuapp.com/days/list?competitionId=${id}`)
        .timeout(5000)
        .mergeMap(response => {//Можно вынести в функцию ParserPointsAndDays
            let days = []
            let points = []
            if (response) {
                response.content.forEach(dayWithPoints => {
                    let day = {
                        ...dayWithPoints,
                        pointList: []
                    }
                    days.push(day)
                })
                // response.content.forEach(dayWithPoints => {
                //     points.push(dayWithPoints.pointList)
                // })
                response.content.forEach(dayWithPoints => {
                    dayWithPoints.pointList.forEach(point => {
                        points.push(point)
                    })
                })

                LOG(days, 'Дни')
                LOG(points, 'Пункты')
                return Observable.of({days, points})
            }
        })
    // .catch(error => {
    //     LOG(error, 'requestDaysAndPointsError')
    //     return Observable.of(requestCompetitionFail())//Здесь доделать фэил дней
    // })
}

const getParticipantsList = () => {
    return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/participants/list?page=0&size=0&competitionId=1&status=accepted')
        .timeout(5000)
        .catch(error => {
            LOG(error, 'requestParticipantsError')
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
    LOG(res, 'Сейчас можно сканировать? Соревнование идет?')
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


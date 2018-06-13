import React from 'react'
import {Observable} from 'rxjs'
import {ajax} from 'rxjs/observable/dom/ajax';

// const API_KEY = ''//ключ апи

export const ScreenState = {//состояния экрана
    LOADING: 'LOADING',
    CONTENT: 'CONTENT',
    ERROR: 'ERROR'
}

export const Actions = {//статус запроса
    REQUEST_DAYS: 'REQUEST_DAYS',
    REQUEST_DAYS_SUCCESS: 'REQUEST_DAYS_SUCCESS',
    REQUEST_DAYS_FAIL: 'REQUEST_DAYS_FAIL',
}

export const requestDaysAction = competitionName => ({//функция запросить список дней
    type: Actions.REQUEST_DAYS,
    payload: {//полезная нагрузка
        competitionName: competitionName
    }
})

export const requestDaysEpic = action$ =>//эпик, выделить поток, получить данные
    action$.ofType(Actions.REQUEST_DAYS)
        .mergeMap(action =>
            ajax.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.competitionName}&appid=${API_KEY}`)// Подставить нужный адрес
                .map(response => {
                    console.log(response)
                    if (response) {
                        return requestDaysSuccess({
                            temp: response.main.temp//Подставить нужный раздел JSON
                        })
                    }
                    else {
                        return requestDaysFail()
                    }
                })
                .catch(error => {
                    console.log(error)
                    return Observable.of(requestDaysFail())
                })
        )

const requestDaysSuccess = (DaysInfo) => ({//функция на случай все удачно, получаем JSON?
    type: Actions.REQUEST_DAYS_SUCCESS,
    payload: {
        DaysInfo
    }
})

const requestDaysFail = () => ({//функция на случай неудачи
    type: Actions.REQUEST_DAYS_FAIL,
    payload: {
        error: "Дни не загружены"
    }

})
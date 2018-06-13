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
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
}

export const requestCompetitionAction = () => ({//функция запросить список соревнований
    type: Actions.REQUEST_COMPETITION,
    payload: {//полезная нагрузка
        competitionList: 'competitionList'
    }
})

export const requestCompetitionEpic = action$ =>//эпик, выделить поток, получить данные
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(action =>
            ajax.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.competitionList}&appid=${API_KEY}`)// Подставить нужный адрес
                .map(response => {
                    console.log(response)
                    if (response) {
                        return requestCompetitionSuccess({
                            temp: response.main.temp//Подставить нужный раздел JSON
                        })
                    }
                    else {
                        return requestCompetitionFail()
                    }
                })
                .catch(error => {
                    console.log(error)
                    return Observable.of(requestCompetitionFail())
                })
        )

const requestCompetitionSuccess = (CompetitionInfo) => ({//функция на случай все удачно, получаем JSON?
    type: Actions.REQUEST_COMPETITION_SUCCESS,
    payload: {
        CompetitionInfo
    }
})

const requestCompetitionFail = () => ({//функция на случай неудачи
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: "Соревнования не загружены"
    }

})
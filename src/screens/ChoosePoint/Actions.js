import {Observable} from 'rxjs'
import {ajax} from 'rxjs/observable/dom/ajax'

// const API_KEY = ''//ключ апи

export const ScreenState = {//состояния экрана
    LOADING: 'LOADING',
    CONTENT: 'CONTENT',
    ERROR: 'ERROR'
}

export const Actions = {//статус запроса
    REQUEST_POINTS: 'REQUEST_POINTS',
    REQUEST_POINTS_SUCCESS: 'REQUEST_POINTS_SUCCESS',
    REQUEST_POINTS_FAIL: 'REQUEST_POINTS_FAIL',
}

export const synchronization = () => ({//Синхронизация данных

})

export const resetPoint = (pointName) =>({//поменять выбранный пункт на другой
    pointName
})

export const storePoint = (pointName) => ({//сохранить название пункта в локальной БД
    pointName
})

export const requestPointsAction = (dayNumber) => ({//функция запросить список соревнований
    type: Actions.REQUEST_POINTS,
    payload: {//полезная нагрузка
        dayNumber: dayNumber
    }
})

export const requestPointsEpic = action$ =>//эпик, выделить поток, получить данные
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(action =>
            ajax.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.dayNumber}&appid=${API_KEY}`)// Подставить нужный адрес
                .map(response => {
                    if (response) {
                        return requestPointsSuccess({
                            temp: response.main.temp//Подставить нужный раздел JSON
                        })
                    }
                    else {
                        return requestPointsFail()
                    }
                })
                .catch(error => {
                    LOG(error)
                    return Observable.of(requestPointsFail())
                })
        )

const requestPointsSuccess = (PointsInfo) => ({//функция на случай все удачно, получаем JSON?
    type: Actions.REQUEST_POINTS_SUCCESS,
    payload: {
        PointsInfo
    }
})

const requestPointsFail = () => ({//функция на случай неудачи
    type: Actions.REQUEST_POINTS_FAIL,
    payload: {
        error: 'Пункты не загружены'
    }

})
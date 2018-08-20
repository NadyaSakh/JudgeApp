/*экшены на выбор пункта selectedPoint
//Экшены на доступность сканирования scanState
//ComponentDidMount Вызывает эпик, который проверяет можно ли сканировать (даты. данные),
//экшен на проверку допустимого времени сканирования
//экшн сохранение события в базу
//экшн на получение информации об участнике --- НУЖНО ЛИ В ОБЩИХ ЭКШЕНАХ, МОЖ В ЭКШЕНЕ ЭКРАНА УЧАСТНИКОВ?*/

import { LOG } from '../../Utils/logger'
import { Observable } from 'rxjs/Rx'

export const Actions = {
    CHECK_SCAN_AVAILABILITY: 'CHECK_SCAN_AVAILABILITY',
    SCAN_DISABLE: 'SCAN_DISABLE',
    POINT_SELECTED: 'POINT_SELECTED',
    POINT_NOT_SELECTED: 'POINT_NOT_SELECTED',
    SAVING_EVENT: 'SAVING_EVENT',
    SAVING_EVENT_SUCCESS: 'SAVING_EVENT_SUCCESS'
}

//экшены на выбор пункта selectedPoint
export const choosePointAction = () => ({
    type: Actions.POINT_NOT_SELECTED
})

export const choosePointEpic = action$ =>
    action$.ofType(Actions.POINT_NOT_SELECTED)
        .mergeMap(() => {
            return choosePoint()
        })
        .mergeMap(chosenPoint => {
            LOG(chosenPoint, 'Выбранный пункт:')
            return Observable.of(choosePointSuccessAction(chosenPoint))
        })

const choosePoint = () => {
    //Как-то выбрать пункт
    //Вернуть Observable
}

const choosePointSuccessAction = (chosenPoint) => ({
    type: Actions.POINT_SELECTED,
    payload: {
        chosenPoint
    }
})

//Экшены на доступность сканирования scanState:
export const checkScanAvailabilityAction = () => ({
    type: Actions.CHECK_SCAN_AVAILABILITY
})

//ComponentDidMount Вызывает эпик, который проверяет можно ли сканировать
export const checkScanAvailabilityEpic = action$ =>
    action$.ofType(Actions.CHECK_SCAN_AVAILABILITY)
        .mergeMap(() => {
            //Сверить дату и время дня с текущей датой
            //Проверить, выбран ли пункт
            //если оба true, то сканировать можно

            //Сделать ZIP для двух функций

            // return

        })
        .mergeMap(scanAvailability => {
            LOG(scanAvailability, 'Сканирование доступно? ')
            let res = null
            scanAvailability ?
                res = Observable.of(scanPointEnableAction()) :
                res = Observable.of(scanPointDisableAction())
            return res
        })

const scanPointEnableAction = () => ({
    type: Actions.POINT_NOT_SELECTED
})

const scanPointDisableAction = () => ({
    type: Actions.SCAN_DISABLE
})

// //ЭКШН НА ПРОВЕРКУ ДОПУСТИМОГО ВРЕМЕНИ СКАНИРОВАНИЯ (МОЖЕТ ФУНКЦИЯ ПРОСТО?)
// const checkDateAndTime = () => ({
//     //
// })
//
// //Функция ,которая проверяет выбранный пункт
// const ckeckPointSelected = () => ({
//
// })
//
// //ЭКШН СОХРАНЕНИЯ СОБЫТИЯ В БАЗУ
// const saveEventAction = () => ({
//     type: Actions.SAVING_EVENT
// })
//
// export const saveEventEpic = action$ =>
//     action$.ofType(Actions.SAVING_EVENT)
//         .mergeMap(() => {
//             //функция сохранения события в базу
//             return Observable.of(saveEventSuccessAction())
//         })
//
// const saveEventSuccessAction = () => ({
//     type: Actions.SAVING_EVENT_SUCCESS
// })

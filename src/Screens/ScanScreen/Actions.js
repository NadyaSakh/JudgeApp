// import { Observable } from 'rxjs'
// import { ajax } from 'rxjs/observable/dom/ajax'
// import { LOG } from '../../Utils/logger'

export const Actions = {
    SCANING: 'SCANING',
    SCANING_SUCCESS: 'SCANING_SUCCESS',
    SCANING_FAIL: 'SCANING_FAIL'
}

export const scanAction = () => ({
    type: Actions.SCANING
})

export const scaningEpic = action$ =>
    action$.ofType(Actions.SCANING)
        .mergeMap(() => {
        })

// const scaningAction = (someting) => ({
//     type: Actions.SCANING_SUCCESS,
//     payload: {
//         someting
//     }
// })
//
// const scaningFail = () => ({
//     type: Actions.SCANING_FAIL,
//     payload: {
//         error: 'Ошибка сканирования.'
//     }
// })
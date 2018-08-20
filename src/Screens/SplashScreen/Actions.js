import { Observable } from 'rxjs'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    CHECK_AUTH: 'CHECK_AUTH',
    NAVIGATE_TO_AUTH: 'NAVIGATE_TO_AUTH',
    NAVIGATE_TO_INIT: 'NAVIGATE_TO_INIT',
    NAVIGATE_TO_APP: 'NAVIGATE_TO_APP'
}

export const checkAuthAction = () => ({
    type: Actions.CHECK_AUTH
})


export const navigateToAction = actionType => ({
    type: actionType
})

export const checkAuthEpic = action$ =>
    action$.ofType(Actions.CHECK_AUTH)
        .mergeMap(() => Observable.zip(
            checkAuthorisation(),
            checkCurrentCompetitionData(),
            (tokenExist, dataExist) => ({tokenExist, dataExist})
        ))
        .map(data => {
            let nextAction = ''
            if (data.tokenExist === null) {
                LOG('АВТОРИЗАЦИЯ')
                nextAction = Actions.NAVIGATE_TO_AUTH
            }
            else if (data.tokenExist && data.dataExist === null) {
                LOG('ИНИЦИАЛИЗАЦИЯ')
                nextAction = Actions.NAVIGATE_TO_INIT
            } else {

                nextAction = Actions.NAVIGATE_TO_APP
            }

            return navigateToAction(nextAction)
        })


const checkAuthorisation = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('accessToken',
            (errors, token) => {
                if (errors !== null) {
                    LOG(errors, 'observer')
                    observer.next(false)
                }
                else {
                    LOG('completeAccess', 'observer')
                    observer.next(token !== null)
                }

                observer.complete()
            })
    })
}


const checkCurrentCompetitionData = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observer')
                    observer.next(false)
                }
                else {
                    LOG('completeData', 'observer')
                    observer.next(currentCompetition !== null)
                }

                observer.complete()
            })
    })
}
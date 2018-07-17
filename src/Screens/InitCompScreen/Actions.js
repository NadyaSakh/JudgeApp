import {Observable} from 'rxjs'
import {ajax} from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
}

export const requestCompetitionAction = () => ({
    type: Actions.REQUEST_COMPETITION
})

export const requestCompetitionEpic = action$ =>
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(() => {
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/1')
            return ajax.getJSON('http://my-json-server.typicode.com/NadyaSakh/Weather-app1/currentCompetition/1/')
                .timeout(5000)
                .mergeMap(response => {
                    requestCurrentCompetition(response)
                })
                .catch(error => {
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        } )

const requestCompetitionSuccess = () => ({
    type: Actions.REQUEST_COMPETITION_SUCCESS
})

const requestCompetitionFail = () => ({
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: 'Соревнования не загружены.'
    }
})

const requestCurrentCompetition = (response) => {
    if (response) {
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
            .mergeMap(() => Observable.of(requestCompetitionSuccess()))
    }
    else {
        return Observable.of(requestCompetitionFail())
    }
}

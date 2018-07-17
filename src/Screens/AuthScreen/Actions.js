import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
// import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'
import { AsyncStorage } from 'react-native'

export const Actions = {
    AUTHORISATION: 'AUTHORISATION',
    AUTHORISATION_SUCCESS: 'AUTHORISATION_SUCCESS',
    AUTHORISATION_FAIL: 'AUTHORISATION_FAIL'
}

export const signInAction = (login, password) => ({
    type: Actions.AUTHORISATION,
    payload: {
        login: login,
        password: password
    }
})

export const authorisationEpic = action$ =>
    action$.ofType(Actions.AUTHORISATION)
    // .mergeMap(action => {
        .mergeMap(() => {
            // ajax.post(url: string, body?: any, headers?: Object): Observable<AjaxResponse>
            // return ajax.post('https://my-json-server.typicode.com/NadyaSakh/Auth1/auth',
            //     {
            //         'login': action.payload.login,
            //         'password': action.payload.password
            //     },
            //     {'Content-Type': 'application / json'})

            return ajax.getJSON('https://my-json-server.typicode.com/NadyaSakh/Auth1/auth')
                .timeout(5000)
                .mergeMap(response => {
                    requestAuthorisation(response)
                })
                .catch(error => {
                    LOG(error, 'AuthEpic')
                    return Observable.of(requestAuthorisationFail())
                })
        })

const requestAuthorisationSuccess = () => ({
    type: Actions.AUTHORISATION_SUCCESS
})

const requestAuthorisationFail = () => ({
    type: Actions.AUTHORISATION_FAIL,
    payload: {
        error: 'Вход не осуществлён'
    }
})

const requestAuthorisation = (response) => {
    if (response) {
        return Observable.create(observer => {
            AsyncStorage.multiSet([
                ['accessToken', response.accessToken],
                ['refreshToken', response.refreshToken]
            ], errors => {

                if (errors !== null) {
                    observer.error(errors)
                }
                else {
                    observer.next()
                    observer.complete()
                }
            })
        })
            .map(() => requestAuthorisationSuccess())
    }
    else {
        LOG(response, 'FAIL')
        return requestAuthorisationFail()
    }
}
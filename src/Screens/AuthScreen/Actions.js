import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'
import {AsyncStorage } from 'react-native'

export const Actions = {
    AUTHORISATION: 'AUTHORISATION',
    AUTHORISATION_SUCCESS: 'AUTHORISATION_SUCCESS',
    AUTHORISATION_FAIL: 'AUTHORISATION_FAIL'
}

export const authorisationAction = (login, password) => ({
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
            LOG('HERE', 'RESPONSE')
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
                    if (response) {
                        LOG(response, 'SUCCESS')
                        return Observable.fromPromise(
                            AsyncStorage.multiSet([
                                ['accessToken', response.accessToken],
                                ['refreshToken', response.refreshToken]
                            ]))
                            .mergeMap(() => Observable.fromPromise(AsyncStorage.getItem('dataExist')))
                            .map(dataExist => requestAuthorisationSuccess(dataExist))
                    }
                    else {
                        LOG(response, 'FAIL')
                        return requestAuthorisationFail()
                    }
                })
                .catch(error => {
                    LOG(error, 'AuthEpic')
                    return Observable.of(requestAuthorisationFail())
                })
        })

const requestAuthorisationSuccess = (dataExists) => ({
    type: Actions.AUTHORISATION_SUCCESS,
    payload: {
        dataExists
    }

})

const requestAuthorisationFail = () => ({
    type: Actions.AUTHORISATION_FAIL,
    payload: {
        error: 'Вход не осуществлён'
    }
})

import { LOG } from '../../Utils/logger'
import { Observable } from 'rxjs/Rx'
import { ajax } from 'rxjs/observable/dom/ajax'
// import {AjaxResponse} from 'rxjs/observable/dom/AjaxObservable'

export const Actions = {
    SHOW_SCAN: 'SHOW_SCAN',
    SEND_TAG: 'SEND_TAG',
    SEND_TAG_SUCCESS: 'SEND_TAG_SUCCESS',
    SEND_TAG_FAIL: 'SEND_TAG_FAIL'
}

export const sendTagsAction = (tags) => ({
    type: Actions.SEND_TAG,
    payload: {
        tags: tags
    }
})
// Доделать отправку тегов
export const sendTagEpic = action$ =>
    action$.ofType(Actions.SEND_TAG)
        .mergeMap(action => {
            let urlString = 'https://my-json-server.typicode.com/NadyaSakh/Auth1/auth'
            return ajax.post(urlString, {'tags': action.payload.tags}, {'Content-Type': 'application/json'})
        })
        .mergeMap(() => {
            LOG('NFC метки отправлены!')
            return Observable.of(sendTagsSuccessAction())
        })
        .catch(error => {
            LOG(error, 'sendTagEpic')
            return Observable.of(sendTagsFail())
        })

const sendTagsSuccessAction = () => ({
    type: Actions.SEND_TAG_SUCCESS
})

const sendTagsFail = () => ({
    type: Actions.SEND_TAG_FAIL,
    payload: {
        error: 'NFC метки не отправлены!'
    }
})
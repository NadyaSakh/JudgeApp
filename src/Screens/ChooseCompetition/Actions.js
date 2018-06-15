import {Observable} from 'rxjs'
import {ajax} from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'


export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
}

export const requestCompetitionAction = () => ({
    type: Actions.REQUEST_COMPETITION,
    payload: {
        competitionList: 'competitionList'
    }
})

export const requestCompetitionEpic = action$ =>
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(action =>
            ajax.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.competitionList}&appid=${API_KEY}`)// Подставить нужный адрес
                .map(response => {

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
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        )

const requestCompetitionSuccess = (competitionInfo) => ({
    type: Actions.REQUEST_COMPETITION_SUCCESS,
    payload: {
        competitionInfo: competitionInfo
    }
})

const requestCompetitionFail = () => ({
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: 'Соревнования не загружены'
    }

})

export const onCompetitionPress = () => ({})

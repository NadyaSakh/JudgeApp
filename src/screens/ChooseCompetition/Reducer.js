import { Actions, ScreenState } from './Actions'

//обязательно должны быть состояния по умолчанию
const defaultState = {
    screenState: ScreenState.CONTENT,
    competitionInfo: null
}

//сам редьюсер
export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        //только пошёл запрос
        case Actions.REQUEST_COMPETITION: {
            return {
                screenState: ScreenState.LOADING,
                competitionInfo: null
            }
        }
        //в случае успеха
        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                competitionInfo: action.payload.competitionInfo
            }
        }
        //в случае неудпчи
        case Actions.REQUEST_COMPETITION_FAIL: {
            return {
                ...prevState,
                screenState: ScreenState.ERROR
            }
        }

        default: {
            return prevState
        }
    }
}
import { Actions, ScreenState } from './Actions'
//обязательно должны быть состояния по умолчанию
const defaultState = {
    screenState: ScreenState.CONTENT,
    DaysInfo: null
}
//сам редьюсер
export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        //только пошёл запрос
        case Actions.REQUEST_DAYS: {
            return {
                screenState: ScreenState.LOADING,
                DaysInfo: null
            }
        }
        //в случае успеха
        case Actions.REQUEST_DAYS_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                DaysInfo: action.payload.DaysInfo
            }
        }
        //в случае неудпчи
        case Actions.REQUEST_DAYS_FAIL: {
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
import { Actions, ScreenState } from './Actions'

//обязательно должны быть состояния по умолчанию
const defaultState = {
    screenState: ScreenState.CONTENT,
    PointsInfo: null
}

//сам редьюсер
export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        //только пошёл запрос
        case Actions.REQUEST_POINTS: {
            return {
                screenState: ScreenState.LOADING,
                PointsInfo: null
            }
        }
        //в случае успеха
        case Actions.REQUEST_POINTS_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                PointsInfo: action.payload.PointsInfo
            }
        }
        //в случае неудпчи
        case Actions.REQUEST_POINTS_FAIL: {
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
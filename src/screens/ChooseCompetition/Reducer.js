import React from 'react'
import { Actions, ScreenState } from './Actions'
//обязательно должны быть состояния по умолчанию
const defaultState = {
    screenState: ScreenState.CONTENT,
    CompetitionInfo: null
}
//сам редьюсер
export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        //только пошёл запрос
        case Actions.REQUEST_COMPETITION: {
            return {
                screenState: ScreenState.LOADING,
                CompetitionInfo: null
            }
        }
//в случае успеха
        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                CompetitionInfo: action.payload.CompetitionInfo
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
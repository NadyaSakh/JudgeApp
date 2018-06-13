import React from 'react'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { reducer } from './screens/ChooseCompetition/Reducer'
import { logger } from 'redux-logger'
import {requestCompetitionAction, requestCompetitionEpic} from './screens/ChooseCompetition/Actions'


//проинициализировали редьюсер
export const rootReducer = combineReducers({
    reducer
})

//проинициализировали эпик
export const rootEpic = combineEpics(
    requestCompetitionEpic
)

//мидалвары эпика
export const epicMiddleware = createEpicMiddleware(rootEpic);

//делаем хранилище
export const store = createStore(
    rootReducer,
    applyMiddleware(logger),
    applyMiddleware(epicMiddleware)
)


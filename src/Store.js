import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { reducer } from './Screens/ChooseCompetition/Reducer'
import { logger } from 'redux-logger'
import { requestCompetitionEpic } from './Screens/ChooseCompetition/Actions'

export const rootReducer = combineReducers({
    reducer
})

export const rootEpic = combineEpics(
    requestCompetitionEpic
)

export const epicMiddleware = createEpicMiddleware(rootEpic)

export const store = createStore(
    rootReducer,
    applyMiddleware(logger),
    applyMiddleware(epicMiddleware)
)


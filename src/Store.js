import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { authReducer } from './Screens/AuthScreen/Reducer'
import { reducer } from './Screens/InitCompScreen/Reducer'
import { logger } from 'redux-logger'
import { requestCompetitionEpic } from './Screens/InitCompScreen/Actions'
import { authorisationEpic } from './Screens/AuthScreen/Actions'


export const rootReducer = combineReducers({
    reducer,
    authReducer,

})

export const rootEpic = combineEpics(
    requestCompetitionEpic,
    authorisationEpic,

)

export const epicMiddleware = createEpicMiddleware(rootEpic)

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        logger,
        epicMiddleware
    )
)


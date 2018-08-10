import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { authReducer } from './Screens/AuthScreen/Reducer'
import { InitScreenReducer } from './Screens/InitCompScreen/Reducer'
import { ScanReducer } from './Screens/ScanScreen/Reducer'
import { ChoosePointScreenReducer } from './Screens/ChoosePointScreen/Reducer'
import { splashScreenReducer } from './Screens/SplashScreen/Reducer'
import { logger } from 'redux-logger'

import {
    requestCompetitionEpic,
    requestDaysAndParticipantsEpic
} from './Screens/InitCompScreen/Actions'
import { authorisationEpic } from './Screens/AuthScreen/Actions'
import { scaningEpic } from './Screens/ScanScreen/Actions'
import { chooseEpic } from './Screens/ChoosePointScreen/Actions'
import { checkAuthEpic } from './Screens/SplashScreen/Actions'


export const rootReducer = combineReducers({
    InitScreenReducer,
    authReducer,
    ScanReducer,
    ChoosePointScreenReducer,
    splashScreenReducer

})

export const rootEpic = combineEpics(
    requestDaysAndParticipantsEpic,
    requestCompetitionEpic,
    authorisationEpic,
    scaningEpic,
    chooseEpic,
    checkAuthEpic
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


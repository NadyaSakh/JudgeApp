import { Actions } from './Actions'
import { ScreenState } from '../../Components/ScreenState'

const defaultState = {
    screenState: ScreenState.CONTENT,
    competitionInfo: null
}

export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.REQUEST_COMPETITION: {
            return {
                screenState: ScreenState.LOADING,
                competitionInfo: null
            }
        }

        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                competitionInfo: action.payload.competitionInfo
            }
        }

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
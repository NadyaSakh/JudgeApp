import { Actions } from './Actions'
import { ScreenState } from '../../Components/ScreenState'

const defaultState = {
    screenState: ScreenState.CONTENT,
    competitionName: null
}

export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.REQUEST_COMPETITION: {
            return {
                screenState: ScreenState.LOADING,
                competitionName: null
            }
        }
        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                screenState: ScreenState.CONTENT,
                competitionName: action.payload.competitionName
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
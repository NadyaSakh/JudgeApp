import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    screenState: ComponentState.CONTENT,
    navigateTo: ''
}

export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.REQUEST_COMPETITION: {
            return {
                ...prevState,
                screenState: ComponentState.LOADING
            }
        }
        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                ...prevState,
                screenState: ComponentState.CONTENT,
                navigateTo: ScreensKeys.APP
            }
        }

        case Actions.REQUEST_COMPETITION_FAIL: {
            return {
                ...prevState,
                screenState: ComponentState.ERROR
            }
        }

        default: {
            return prevState
        }
    }
}
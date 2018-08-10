import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
// import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    screenState: ComponentState.CONTENT
    //navigateTo: ''
}

export const ScanReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SCANING: {
            return {
                ...prevState,
                screenState: ComponentState.LOADING
            }
        }
        case Actions.SCANING_SUCCESS: {
            return {
                ...prevState,
                screenState: ComponentState.CONTENT
                // navigateTo: ScreensKeys.APP // Переход на экран о типе события
            }
        }

        case Actions.SCANING_FAIL: {
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
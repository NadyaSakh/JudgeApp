import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
// import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    componentState: ComponentState.CONTENT
    // navigateTo: ''
}

export const ChoosePointScreenReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.CHOOSING: {
            return {
                ...prevState,
                componentState: ComponentState.LOADING
            }
        }
        case Actions.CHOOSING_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
                // navigateTo: ScreensKeys.APP.Scan
            }
        }

        case Actions.CHOOSING_FAIL: {
            return {
                ...prevState,
                componentState: ComponentState.ERROR
            }
        }

        default: {
            return prevState
        }
    }
}
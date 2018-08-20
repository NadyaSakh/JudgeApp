import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    componentState: ComponentState.CONTENT
}

export const PreScanReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SHOW_SCAN: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
            }
        }
        default: {
            return prevState
        }
    }
}
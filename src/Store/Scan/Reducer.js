import { ScanState } from './Constants'
import { Actions } from './Actions'


const defaultState = {
    scanState: ScanState.SCAN_DISABLE,
    chosenPoint: null
}

export const ScanStoreReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SCAN_DISABLE: {
            return {
                ...prevState,
                scanState: ScanState.SCAN_DISABLE
            }
        }
        case Actions.POINT_NOT_SELECTED: {
            return {
                ...prevState,
                scanState: ScanState.POINT_NOT_SELECTED
            }
        }
        case Actions.POINT_SELECTED: {
            return {
                scanState: ScanState.POINT_SELECTED,
                chosenPoint: action.payload.chosenPoint
            }
        }
        default: {
            return prevState
        }
    }
}


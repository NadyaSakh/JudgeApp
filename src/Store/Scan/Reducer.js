import { ComponentState, ScanState } from '../../Components/ActionContainer'

// const defaultState = {
//     scanState: ''
// }
//Добавить в стор
export const ScanStoreReducer = (prevState = defaultState, scanEnable) => {
    if (!scanEnable) {
        return {
            ...prevState,
            scanState: ScanState.SCAN_DISABLE
        }
    }
}

const defaultState = {
    scanState: ScanState.SCAN_DISABLE,
    selectedPoint: null
}

import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import {store} from './Store'
import ChooseCompetition from './Screens/InitCompScreen'
import SplashScreen from './Screens/SplashScreen'
import AuthScreen from './Screens/AuthScreen'
import ScanCompetition from './Screens/ScanScreen'
import { ScreensKeys } from './ScreenKey'

export const AppStack = createStackNavigator({
    Scan: ScanCompetition
})

const RootStack = createSwitchNavigator(
    {
        [ScreensKeys.INIT]: ChooseCompetition,
        [ScreensKeys.SPLASH]: SplashScreen,
        [ScreensKeys.APP]: AppStack,
        [ScreensKeys.AUTH]: AuthScreen,
    },
    {
        initialRouteName: ScreensKeys.SPLASH
    }
)

export class App extends React.Component {
    render = () =>
        <Provider store={store}>
            <RootStack/>
        </Provider>
}



import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import { store } from './Store'
import CurrentCompetition from './Screens/InitCompScreen'
import SplashScreen from './Screens/SplashScreen'
import AuthScreen from './Screens/AuthScreen'
import ScanCompetition from './Screens/ScanScreen'
import { ScreensKeys } from './ScreenKey'
import ChoosePointScreen from './Screens/ChoosePointScreen'

export const AppStack = createStackNavigator({
    [ScreensKeys.SCAN]: ScanCompetition,
    [ScreensKeys.POINTS]: ChoosePointScreen
})

const RootStack = createSwitchNavigator(
    {
        [ScreensKeys.SPLASH]: SplashScreen,
        [ScreensKeys.AUTH]: AuthScreen,
        [ScreensKeys.INIT]: CurrentCompetition,
        [ScreensKeys.APP]: AppStack
    },
    {
        initialRouteName: ScreensKeys.SPLASH
        // initialRouteName: ScreensKeys.AUTH
    }
)

export class App extends React.Component {
    render = () =>
        <Provider store={store}>
            <RootStack/>
        </Provider>
}



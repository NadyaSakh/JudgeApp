import React from 'react'
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation'
import { Provider } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { store } from './Store'
import CurrentCompetition from './Screens/InitCompScreen'
import SplashScreen from './Screens/SplashScreen'
import AuthScreen from './Screens/AuthScreen'
import ScanCompetition from './Screens/ScanScreen'
import { ScreensKeys } from './ScreenKey'
import ChoosePointScreen from './Screens/ChoosePointScreen'
import MenuScreen from './Screens/MenuScreen'
import PreScanScreen from './Screens/PreScanScreen'

//Импортировать мои экраны


export const AppStack = createStackNavigator({
    [ScreensKeys.SCAN]: ScanCompetition,
    [ScreensKeys.POINTS]: ChoosePointScreen
})

export const MenuStack = createStackNavigator({
    [ScreensKeys.MENU]: MenuScreen,
    [ScreensKeys.PRE_SCAN]: PreScanScreen

})

export const TabNavigator = createBottomTabNavigator(
    {
        Scan: AppStack,
        Menu: MenuStack
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.index === 0,
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state
                let iconName
                if (routeName === 'Scan') {
                    iconName = `ios-barcode${focused ? '' : ''}`
                } else if (routeName === 'Menu') {
                    iconName = `ios-options${focused ? '' : ''}`
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>
            }
        }),
        tabBarOptions: {
            activeTintColor: '#2080ff',
            inactiveTintColor: 'gray'
        }
    }
)

const RootStack = createSwitchNavigator(
    {
        [ScreensKeys.SPLASH]: SplashScreen,
        [ScreensKeys.AUTH]: AuthScreen,
        [ScreensKeys.INIT]: CurrentCompetition,
        [ScreensKeys.APP]: TabNavigator
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



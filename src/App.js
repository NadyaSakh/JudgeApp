import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import {store} from './Store'
import ChooseCompetition from './Screens/ChooseCompetition'

const RootStack = StackNavigator({
    Home: {screen: ChooseCompetition},
})

export class App extends React.Component {
    render = () =>
        <Provider store={store}>
            <RootStack/>
        </Provider>
}

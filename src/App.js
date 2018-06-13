import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import {store} from './Store'
import {ChooseCompetition} from './screens/ChooseCompetition/ChooseCompetition'

//yjcfhg
//экраны
const RootStack = StackNavigator({
    Home: {screen: ChooseCompetition},
})

export class App extends React.Component {
    render = () =>//какой экран рисовать
        <Provider store={store}>
            <RootStack/>
        </Provider>
}




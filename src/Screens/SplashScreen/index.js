import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text
} from 'react-native'
import { LOG } from '../../Utils/logger'
import PropTypes from 'prop-types'

import { ScreensKeys } from '../../ScreenKey'


export default class SplashScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object
    }

    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        let userToken = this.getUserToken()
        let dataExists = this.checkDataExist()

        let screen = ''
        if (userToken === null) {
            screen = ScreensKeys.AUTH
        } else if (userToken && dataExists === null) {
            screen = ScreensKeys.INIT
        } else {
            screen = ScreensKeys.APP
        }

        this.props.navigation.navigate(screen)
    }


    getUserToken = async () => {
        await AsyncStorage.getItem('accessToken', (err, token) => {
            return token
        })
    }

    checkDataExist = async () => {
        try {
            await AsyncStorage.getItem('currentCompetition', (err, data) => {
                return data
            })
        } catch (error) {
            LOG(error, 'Данные не существуют!!')
            return null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Загрузка приложения</Text>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    }
})
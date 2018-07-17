import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { LOG } from '../../Utils/logger'
import { ScreensKeys } from '../../ScreenKey'


export default class SplashScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object
    }

    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    //Не работает отчистка данных!
    // clearData = async () => {
    //     try {
    //         let keys = ['accessToken', 'refreshToken']
    //         return await AsyncStorage.multiRemove(keys, () => {
    //             // keys k1 & k2 removed, if they existed
    //             LOG('Удаление данных', 'УДАЛЕНИЕ')
    //         })
    //     } catch (error) {
    //         LOG(error, 'Ошибка удаления!!')
    //     }
    // }

    _bootstrapAsync = () => {
        //Убрать, если не нужно удалять авторизационные данные

        let userToken = this.getUserToken()
        let dataExists = this.checkDataExist()

        let screen = ''

        if (userToken && dataExists) {
            screen = ScreensKeys.APP
        }
        else if (userToken && !dataExists) {
            screen = ScreensKeys.INIT
        }
        else {
            screen = ScreensKeys.AUTH
        }

        this.props.navigation.navigate(screen)
    }

    getUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken')
        LOG(token, 'user Token')
        return token
    }

    checkDataExist = async () => {
        try {
            const dataFlag = await AsyncStorage.getItem('dataExits')
            LOG(dataFlag, 'data Exists')
            return dataFlag

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
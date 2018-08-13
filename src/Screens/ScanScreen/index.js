import React from 'react'
import PropTypes from 'prop-types'
import {
    AsyncStorage,
    Text
} from 'react-native'
import { connect } from 'react-redux'

import { ErrorView } from '../../Components/ScreenError'
import { ContentView } from './Components'
import { LOG } from '../../Utils/logger'
import { ActionContainer } from '../../Components/ActionContainer'
import { ScanState } from './Constants'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'
import { ScreensKeys } from '../../ScreenKey'


export const mapStateToProps = state => ({
    ...state.ScanReducer
})

// export const mapDispatchToProps = dispatch => ({
//     dispatch
// })

export class ScanCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        selectedPointName: PropTypes.string,
        scanEnable: PropTypes.bool
    }

    componentDidMount() {
        LOG('MOUNT_ScanScreen', 'MOUNT')
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed')
            }
        })
            .then(result => {
                console.log('start OK', result)
            })
            .catch(error => {
                console.warn('device does not support nfc!')
                this.setState({supported: false})
            })

        NfcManager.registerTagEvent(tag => {
            console.log('Tag Discovered', tag)

            //проверять возможность сканирования
        }, 'Hold your device over the tag', true)

        //проверять
    }

    // componentDidUpdate = prevProps => {
    //     if (this.props.navigateTo !== prevProps.navigateTo) {
    //         this.props.navigation.navigate(ScreensKeys.Points)
    //     }
    // }

    componentWillUnmount() {
        NfcManager.unregisterTagEvent()
        NfcManager.stop()
    }

    navigation = () => {
        this.props.navigation.navigate(ScreensKeys.POINTS)
    }

    scanFunction = () => {

    }

    getFullName = async () => {
        try {
            await AsyncStorage.getItem('fullName', (err, fullName) => {
                return fullName
            })
        } catch (error) {
            LOG(error, 'Полное имя не получено!')
            return null
        }
    }
    //доделать
    // getChoosenPoint = async () => {
    //     try{
    //         await AsyncStorage.getItem('fullName', (err, fullName) => {
    //             return fullName
    //         })
    //     } catch (error) {
    //         LOG(error, 'Полное имя не получено!')
    //         return null
    //     }
    // }
    //description={'Соревнования закончились. Сканирование не доступно.'}

    render = () => {
        return <ActionContainer
            componentState={this.props.screenState}
            contentView={
                <ContentView
                    judgeName={'Надя'}
                    selectedPointName={'Под горой'}
                    scanState={ScanState.POINT_NOT_SELECTED}//доделать
                    description={'Соревнования ещё не начались. Сканирование не доступно.'}
                    onPress={this.navigation}
                />
            }
            loadingView={
                <Text>Идёт сканирование. Пожалуйста подождите.</Text>
            }
            errorView={
                <ErrorView
                    text='Ошибка сканирования. Попробуйте ещё раз.'
                    onRepeat={this.scanFunction}
                />
            }
        />
    }
}

export default connect(mapStateToProps)(ScanCompetition)
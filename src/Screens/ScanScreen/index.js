import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'

import { ErrorView } from '../../Components/ScreenError'
import { ContentView } from './Components'
import { LOG } from '../../Utils/logger'
import { ActionContainer } from '../../Components/ActionContainer'
import { ScanState } from '../../Store/Scan/Constants'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'
import { ScreensKeys } from '../../ScreenKey'
import { getFullNameAction } from './Actions'
import { styles } from '../../Components/Styles'

export const mapStateToProps = state => ({
    ...state.ScanReducer
})

export const mapDispatchToProps = dispatch => ({
    getFullName: () => dispatch(getFullNameAction())
})

export class ScanCompetition extends React.Component {
    static navigationOptions = {
        header: null
    }

    static propTypes = {
        screenState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        selectedPointName: PropTypes.string,
        scanState: PropTypes.string,
        fullName: PropTypes.string,
        getFullName: PropTypes.func
    }

    componentDidMount() {
        LOG('componentDidMount')
        this.getFullName()
    }

    // Добавить проверку, можно ли сканировать?
    // С пропсов будет приходить переменная scanState со значением:
    // ScanState.POINT_SELECTED, значит можно сканировать
    // Если ScanState.SCAN_DISABLE или ScanState.POINT_NOT_SELECTED
    // - нельзя сканировать
    scanNFC = () => {
        NfcManager.start({
            onSessionClosedIOS: () => {
                LOG('ios session closed')
            }
        })
            .then(result => {
                LOG('start OK', result)
            })
            .catch(error => {
                LOG('device does not support nfc!')
                this.setState({supported: false})
            })

        NfcManager.registerTagEvent(tag => {
            LOG(tag, 'Tag Discovered:')
            //id: "FD7CDEC0"
            this.setState({tag: tag})
        }, 'Hold your device over the tag', true)
    }

    // Перейти на выбор пункта
    navigation = () => {
        this.props.navigation.navigate(ScreensKeys.POINTS)
    }
    // Получить польное имя судьи
    getFullName = () => {
        this.props.getFullName()
    }

    render = () => {
        return <View style={styles.container}>
            <NavigationEvents
                onDidFocus={payload => {
                    console.log('ss did focus', payload)
                    this.scanNFC()
                }}
                onWillBlur={payload => {
                    console.log('ss will blur', payload)
                    NfcManager.unregisterTagEvent()
                    NfcManager.stop()
                }}
            />
            <ActionContainer
                componentState={this.props.screenState}
                contentView={
                    <ContentView
                        judgeName={this.props.fullName}
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
        </View>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ScanCompetition)
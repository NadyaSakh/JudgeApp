import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { styles } from '../../Components/Styles'
import { LOG } from '../../Utils/logger'
import { getParticipantInfoAction, saveEventAction } from './Actions'
import { getCurrentDay, getTime } from '../../Utils/tools'

const mapDispatchToProps = dispatch => ({
    getParticipantsInfo: tagId => dispatch(getParticipantInfoAction(tagId)),
    saveEvent: info => dispatch(saveEventAction(info))
})

const mapStateToProps = state => ({
    ...state.ScanTypeReducer
})

export class ScanTypeScreen extends React.Component {
    static navigationOptions = {
        title: 'Новое событие',
        headerStyle: {
            backgroundColor: '#2080ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }

    static propTypes = {
        componentState: PropTypes.string.isRequired,
        participant: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            surname: PropTypes.string,
            fatherName: PropTypes.string,
            vehicleType: PropTypes.string,
            racingMastery: PropTypes.string
        }),
        message: PropTypes.string,
        getParticipantsInfo: PropTypes.func,
        saveEvent: PropTypes.func
    }

    state = {
        participant:
            {
                id: 1,
                name: 'Алексей',
                surname: 'Алехин',
                fatherName: 'Генадьевич',
                vehicleType: 'мотоцикл',
                racingMastery: 'проффи'
            }
    }

    componentDidMount() {
        LOG('MOUNT_ScanTypeScreen', 'MOUNT')
        // const tagId = this.props.navigation.getParam('tagId', 'NO-ID')
        // const parsedTagId = JSON.stringify(tagId)
        // this.getParticipantsInfo(1) //parsedTagId
    }

    constructor(props) {
        super(props)
        const tagId = this.props.navigation.getParam('tagId', 'NO-ID')
        // const parsedTagId = JSON.stringify(tagId)

        const pointId = this.props.navigation.getParam('pointId', 'NO-ID')
        // const parsedPointId = JSON.stringify(pointId)

        this.onSave(tagId, pointId)
    }

    // получить имя участника и его инфу по метке
    getParticipantsInfo = (tagId) => {
        this.props.getParticipantsInfo(tagId)
    }

    //  Создать событие, Сохранить событие в БД, отправить на сервер, если Интернет есть, нужен эпик
    onSaveEvent = data => {
        this.props.saveEvent(data)
    }

    onSave = (parsedTagId, parsedPointId) => {
        // сохранить и выйти назад
        LOG('Сохранение')
        // eventId = eventId + 1
        let currentTime = getTime()
        // let currentDate = getCurrentDay()

        let event = {
            // eventId: eventId,
            tagId: parsedTagId,
            // participantId: props.participantInfo.id,
            dateTime: currentTime,
            // dateTime: currentDate,
            pointId: parsedPointId,
            sendStatus: 'NOT_SENDED'
        }

        LOG(event, 'СОБЫТИЕ: ')
        this.onSaveEvent(event)
        // this.props.navigation.goBack()
    }

    render = () => {
        const tagId = this.props.navigation.getParam('tagId', 'NO-ID')

        return <View style={styles.container}>
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <ContentView
                        tag={tagId}
                        message={this.props.message}
                        // participantInfo={this.props.participant}
                        participantInfo={this.state.participant}

                    />
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка экрана выбора типа события.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Загрузка экрана. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanTypeScreen)
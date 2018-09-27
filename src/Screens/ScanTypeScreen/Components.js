import React from 'react'
import {
    View
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'


export const Info = props => {
    Info.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <SingleLineText
        text={props.text}
        style={props.style}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <Info
            text={props.text}
            style={styles.textStyle}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        participantInfo: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            surname: PropTypes.string,
            fatherName: PropTypes.string,
            vehicleType: PropTypes.string,
            racingMastery: PropTypes.string
        }),
        tag: PropTypes.string,
        message: PropTypes.string

    }
    return <View>
        <Info
            text={'Участник: '}
            style={styles.boldStyle}
        />
        <Info
            text={`${props.participantInfo.name} ${props.participantInfo.fatherName} ${props.participantInfo.surname}`}
            style={styles.textStyle}
        />
        <Info
            text={` NFC тег: ${props.tag}`}
            style={styles.textStyle}
        />
        <Info
            text={` Уровень: ${props.participantInfo.racingMastery}`}
            style={styles.textStyle}
        />
        <Info
            text={`Тип транспорта: ${props.participantInfo.vehicleType}`}
            style={styles.textStyle}
        />
        <Info
            text={'Статус:'}
            style={styles.boldStyle}
        />
        <View style={styles.centredView}>

            <Info
                text={` ${props.message}`}
                style={styles.greenStyle}
            />
        </View>
    </View>
}

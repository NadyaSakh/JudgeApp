import React from 'react'
import {
    View,
    Button,
    Text,
    TouchableOpacity
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
        tag: PropTypes.array,
        onPress: PropTypes.func
    }

    return <View>
        <Info
            text={'Сканирование.. Пожалуйста, поднесите NFC метку к телефону.'}
            style={styles.textStyle}
        />
        <Info
            text={`Отсканированная метка: ${props.tag}`}
            style={styles.textStyle}
        />
        {/*<Button*/}
        {/*onPress={props.onPress}*/}
        {/*title='Отправить метки'*/}
        {/*/>*/}
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}> Отправить метки </Text>
            </TouchableOpacity>
        </View>
    </View>
}

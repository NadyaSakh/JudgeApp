import React from 'react'
import {
    View,
    Button,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

import { LOG } from '../../Utils/logger'
import { SingleLineText } from '../../Components/SingleLineText'
import { LoadingIndicator } from '../../Components/LoadingIndicator'

export const LoadingView = props => {
    LoadingView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <SingleLineText
            text={props.text}
            styleHeader={styles.sectionHeader}
        />
        <LoadingIndicator/>
    </View>
}


export const ContentView = props => {
    ContentView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        login : PropTypes.string,
        password: PropTypes.string
    }

    return <View style={styles.container}>
        <Button
            onPress={() => {
                this.props.onClick(props.login, props.password)
                LOG(props.login)
            }}
            title='Войти'/>
    </View>
}

//Сделать глобальный стиль и стиль для контента
export const styles = StyleSheet.create({
    container: {
        flex: 0,
        // backgroundColor: 'red'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    }
})
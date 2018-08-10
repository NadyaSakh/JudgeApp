import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { Strings } from '../../Strings'

export const Info = props => {
    Info.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <SingleLineText
        text={props.text}
        styleHeader={props.styleHeader}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <Info
            text={props.text}
            styleHeader={styles.sectionHeader}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        data: PropTypes.array,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        competitionExists: PropTypes.bool
    }

    let screenText = props.competitionExists ?
        Strings.CURRENT_COMPETITION_EXISTS :
        Strings.CURRENT_COMPETITION_NOT_EXISTS

    return <Info
        text={screenText}
        styleHeader={styles.sectionHeader}
    />
}


export const styles = StyleSheet.create({
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
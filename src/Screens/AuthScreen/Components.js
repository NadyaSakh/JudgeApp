import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

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
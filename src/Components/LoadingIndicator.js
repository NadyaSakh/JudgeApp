import React from 'react'
import {
    View,
    ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'

export const LoadingIndicator = props => {
    LoadingIndicator.propTypes = {
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number)
    }
    return <View style={props.style}>
        <ActivityIndicator/>
    </View>
}
import React from 'react'
// import PropTypes from 'prop-types'
import {
    View,
    Text} from 'react-native'

import {LOG} from '../../Utils/logger'


export const mapStateToProps = state => ({
    ...state.reducer
})

// export const mapDispatchToProps = dispatch => ({
//
// })

export default class ScanCompetition extends React.Component {
    static propTypes = {
        // screenState: PropTypes.string.isRequired
    }

    componentDidMount(){
        LOG('MOUNT_ScanScreen','MOUNT')
    }


    render = () => {
        return <View>
            <Text>Страница сканирования</Text>
        </View>
    }
}

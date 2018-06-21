import { Alert } from 'react-native'
import PropTypes from 'prop-types'

export const ScreenError = props => {
    ScreenError.propTypes = {
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }
    return Alert.alert('Ошибка', props.text)
}
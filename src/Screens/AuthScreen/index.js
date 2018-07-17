import React from 'react'
import PropTypes from 'prop-types'
import { LOG } from '../../Utils/logger'
import { connect } from 'react-redux'
import {
    View,
    TextInput,
    Button, StyleSheet
} from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { authorisationAction } from './Actions'

const mapStateToProps = state => ({...state.authReducer})

const mapDispatchToProps = dispatch => ({
    onClick: (login, password) => dispatch(authorisationAction(login, password))
})


export class AuthScreen extends React.Component {
    static propTypes = {
        authState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        onClick: PropTypes.func,
        navigation: PropTypes.object
    }

    state = {
        login: '',
        password: ''
    }

    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
        LOG(props)
    }

    //Для перехода на другой экран
    componentDidUpdate = prevProps => {
        if (this.props.navigateTo !== prevProps.navigateTo) {
            this.props.navigation.navigate(this.props.navigateTo)
        }
    }

    componentDidMount() {
        LOG('MOUNT_Auth', 'MOUNT')
    }

    focusTextInput() {
        this.textInput.current.focus()
    }

    onSubmit = () => {
        this.props.onClick(this.state.login, this.state.password)
    }

    render = () => {
        return <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={this.focusTextInput}
                placeholder='Введите логин'
                onChangeText={(text) => this.setState({login: text})}/>
            <TextInput
                style={styles.textInput}
                ref={this.textInput}
                onSubmitEditing={this.onSubmit}
                placeholder='Введите пароль'
                onChangeText={(text) => this.setState({password: text})}/>
            <ActionContainer
                componentState={this.props.authState}
                contentView={
                    <Button
                        onPress={this.onSubmit}
                        disabled={this.state.login.length === 0 && this.state.password.length === 0}
                        title='Войти'/>
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка авторизации.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Авторизация. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        alignSelf: 'stretch'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
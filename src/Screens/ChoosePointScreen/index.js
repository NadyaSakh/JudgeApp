import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { LOG } from '../../Utils/logger'
import { getCompNameAction, getPointsAction } from './Actions'
import { styles } from '../../Components/Styles'

const mapStateToProps = state => ({...state.ChoosePointScreenReducer})

const mapDispatchToProps = dispatch => ({
    getCompName: () => dispatch(getCompNameAction()),
    getPoints: () => dispatch(getPointsAction())
})

export class ChoosePointScreen extends React.Component {
    static navigationOptions = {
        title: 'Выбор пункта',
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
        competitionName: PropTypes.string,
        currentPoints: PropTypes.array,
        getCompName: PropTypes.func,
        getPoints: PropTypes.func
    }

    componentDidMount() {
        this.getCompName()
        this.getPoints()
    }

    constructor(props) {
        super(props)
    }

    onNav = () => {

    }
    //Че это, я забыла..
    onChange = () => {
        // this.getCompName()
    }

    onPointPress = () => {

    }

    //Загружать из бд название соревнования
    getCompName = () => {
        this.props.getCompName()
    }

    //загружать из бд пункты по  айди дня - НЕ РАБОТАЕТ!
    getPoints = () => {
        this.props.getPoints()
    }

    //вычислить сегодняшнюю дату
    getDay = () => {
        let dateString = ' '

        let newDate = new Date()
        dateString += (newDate.getMonth() + 1) + '.'
        dateString += newDate.getDate() + '.'
        dateString += newDate.getFullYear()

        LOG(dateString)
        return dateString
    }

    // Исправить ошибки в компонентах:
    // В onPress
    // В key extractor
    // Style invalid prop in SingleLineText in TouchableHighlight
    // isMounted
    render = () => {

        return <View style={styles.container}>
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <ContentView
                        competitionName={this.props.competitionName}
                        points={this.props.currentPoints}
                        day={this.getDay()}
                        onChange={this.onChange()}
                        onNav={this.onNav}
                        onPointPress={this.onPointPress}
                        isChecked={false}
                    />
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка. Пункты не загружены.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Загрузка пунктов. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChoosePointScreen)
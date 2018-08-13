import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Observable } from 'rxjs'
import {
    AsyncStorage
    // StyleSheet,
    // View
} from 'react-native'


import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { LOG } from '../../Utils/logger'


const mapStateToProps = state => ({...state.ChoosePointScreenReducer})

// const mapDispatchToProps = dispatch => ({
// })

export class ChoosePointScreen extends React.Component {
    static propTypes = {
        componentState: PropTypes.string.isRequired
        // navigateTo: PropTypes.string,
        // navigation: PropTypes.object
    }

    state = {
        pointList: [
            {key: 'Под горой'},
            {key: 'У реки'},
            {key: 'Переезд'},
            {key: 'Заправка'},
            {key: 'Пункт отдыха'}
        ],
        compName: ''
    }

    constructor(props) {
        super(props)
    }

    //Для перехода на другой экран
    // componentDidUpdate = prevProps => {
    //     if (this.props.navigateTo !== prevProps.navigateTo) {
    //         this.props.navigation.navigate(this.props.navigateTo)
    //     }
    // }

    onNav = () => {

    }

    onChange = () => {
        this.getCompName()
    }

    onPointPress = () => {

    }

    //Загружать из бд название соревнования
    getCompName = () => {
        try {
            AsyncStorage.getItem('currentCompetition', (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionName')
                    //Что-то ещё?
                }
                else {
                    let parsedCompetition = JSON.parse(currentCompetition)
                    let compName = parsedCompetition.name
                    LOG(compName, 'Название соревнования')
                    this.setState({compName: compName})
                    return compName
                }
            })
        } catch (error) {
            LOG(error, 'Название соревнования не получено!')
            return null
        }
    }

    //загружать из бд пункты по  айди дня - НЕ РАБОТАЕТ!
    getPoints = () => {
        try {
            AsyncStorage.getItem('currentCompetitionPoints', (errors, points) => {
                if (errors !== null) {
                    LOG(errors, 'observerCurrentCompetitionPoints')
                }
                else {
                    let parsePoints = JSON.parse(points)
                    LOG(parsePoints, 'Пункты')
                    return parsePoints
                }
            })
        } catch (error) {
            LOG(error, 'Название соревнования не получено!')
            return null
        }
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


    render = () => {
        return <ActionContainer
            componentState={this.props.componentState}
            contentView={
                <ContentView
                    competitionName={this.state.compName}
                    points={this.getPoints()}
                    day={this.getDay()}
                    onChange={this.onChange()}
                    onNav={this.onNav}
                    onPointPress={this.onPointPress}
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
    }
}

// export const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'skyblue',
//         flex: 2
//     }
// })

export default connect(mapStateToProps)(ChoosePointScreen)//ет диспатча
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
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
        ]
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
                    return compName
                }
            })
        } catch (error) {
            LOG(error, 'Название соревнования не получено!')
            return null
        }

        //Всегда ли, обращаясь в базу, нужно использовать Обсервэбл?
        // return Observable.create(observer => {
        //     LOG('getCurrentCompetitionId', 'HERE!')
        //     AsyncStorage.getItem('currentCompetition',
        //         (errors, currentCompetition) => {
        //             if (errors !== null) {
        //                 LOG(errors, 'observerCompetitionId')
        //                 observer.next(false)
        //             }
        //             else {
        //                 let parsedCompetition = JSON.parse(currentCompetition)
        //                 LOG(parsedCompetition.name, 'observer')
        //                 observer.next(parsedCompetition.name)
        //
        //             }
        //             observer.complete()
        //         })
        // })
    }

    //загружать из бд пункты по дате
    getPoints = () => {

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

        // let dateString = ''
        // let newDate = new Date()
        //
        // dateString += newDate.getFullYear() + '-'
        // dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
        // dateString += newDate.getDate()
        // return dateString
    }

    render = () => {
        return <ActionContainer
            componentState={this.props.componentState}
            contentView={
                <ContentView
                    competitionName={this.compName}
                    points={this.state.pointList}
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
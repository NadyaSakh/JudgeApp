import React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {ScreenState} from './Actions'
import {requestDaysAction} from '../ChooseDay/Actions'


export const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    competitionInfo: state.reducer.competitionInfo
})

export const mapDispatchToProps = dispatch => ({
    // requestCompetitionList: () => dispatch(requestCompetitionAction()),
    onClick: competitionName =>
        dispatch(requestDaysAction(competitionName)),
    // надо передать аргумент - название сорвенования на другой экран
    // и перейти на следующий экран:::


})

export class ChooseCompetition extends React.Component {

    static propTypes = {
        screenState: PropTypes.string.isRequired

    }
    state = {
        competitionList: ''
    }

    //сначала получаем данные
    //     componentDidMount(){
    //         requestCompetitionAction()
    //     }

    //обязательно если используем Пропсы
    //     componentWillReceiveProps = nextProps => {
    //         if (nextProps.screenState === ScreenState.ERROR) {//
    //             Alert.alert('Ошибка', 'Список соревнований не загружен.')
    //         }
    //     }

    render = () =>
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Выберите соревнование:</Text>
            {this.renderScreenState(this.props.screenState)}
        </View>

    renderScreenState = screenState => {
        switch (screenState) {
            case ScreenState.LOADING: {
                return (
                    <View style={styles.container}>
                        <ActivityIndicator/>
                    </View>
                )
            }

            default: {
                return (
                    <View>
                        <FlatList
                            // data={this.state.competitionList}
                            data={[
                                {key: 'Enduro 2016'},
                                {key: 'Enduro май 2017'},
                                {key: 'Enduro июль 2017'},
                                {key: 'Enduro август 2017'},
                                {key: 'Enduro май 2018'},
                                {key: 'Enduro июнь 2018'},
                                {key: 'Enduro август 2018'},
                                {key: 'Enduro Жара 2018'},
                            ]}
                            renderItem={({item}) => (
                                <TouchableHighlight
                                    onPress={() => {
                                        // this.props.onClick(item.key)
                                    }}>
                                    <Text style={styles.item}>{item.key}</Text>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </View>)
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 16,
        height: 44,
    },
})

//Не работает коннект
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCompetition)
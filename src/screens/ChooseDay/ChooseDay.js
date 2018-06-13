import React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native'
import {connect} from 'react-redux'

import {ScreenState} from './Actions'
import {requestPointsAction} from '../ChoosePoint/Actions'

export const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    DaysInfo: state.reducer.DaysInfo
})
export const mapDispatchToProps = dispatch => ({
    onClick: dayNumber => dispatch(requestPointsAction(dayNumber))
    //передать выбранный день на экран пунктов
    //перейти на следующий экран

})

export class ChooseDay extends React.Component{

    static propTypes = {
        screenState: PropTypes.string.isRequired

    }
    state = {
        daysList: ''
    }
    //Дни были получены на предыдущем экране

    //обязательно если используем Пропсы
    // componentWillReceiveProps = nextProps => {
    //     if (nextProps.screenState === ScreenState.ERROR) {//
    //         Alert.alert('Ошибка', 'Список соревнований не загружен.')
    //     }
    // }

    render = () =>
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Выберите день соревнования:</Text>
            {this.renderScreenState(this.props.screenState)}
        </View>

    renderScreenState = screenState => {
        switch (screenState) {
            case ScreenState.LOADING: {
                return(
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
                                {key: '1 день(28.06.2018)'},
                                {key: '2 день (29.06.2018)'},
                                {key: '3 день (30.06.2018)'},
                            ]}
                            renderItem={({item}) =>(
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
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

//Не работает коннект
export default connect(mapStateToProps, mapDispatchToProps)(ChooseDay)
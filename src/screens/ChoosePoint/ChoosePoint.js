import React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Button
} from 'react-native'
import {connect} from 'react-redux'

import {
    storePoint,
    ScreenState,
    synchronization,
    resetPoint
} from './Actions'

export const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    PointsInfo: state.reducer.PointsInfo
})

export const mapDispatchToProps = dispatch => ({
    onClick: pointName => dispatch(storePoint(pointName)),
    changePoint: pointName => dispatch(resetPoint(pointName)),
    synchronization: () => dispatch(synchronization())
})

export class ChoosePoint extends React.Component {

    static propTypes = {
        screenState: PropTypes.string.isRequired

    }
    state = {
        pointsList: '',
        competitionName: '',
        dayNumber: ''
    }

    // данные по пунктам были загружены на предыдущем экране

    //обязательно если используем Пропсы
    // componentWillReceiveProps = nextProps => {
    //     if (nextProps.screenState === ScreenState.ERROR) {//
    //         Alert.alert('Ошибка', 'Список соревнований не загружен.')
    //     }
    // }

    render = () =>
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Гонка'{this.state.competitionName}'</Text>
            <Text>Сегодня {this.state.dayNumber}</Text>
            <Text style={styles.sectionHeader}>Выберите свой пункт:</Text>
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
                                {key: 'Под горой'},
                                {key: 'У реки'},
                                {key: 'Переезд'},
                                {key: 'На холме'},
                                {key: 'Заправка'},
                                {key: 'Пункт отдыха'},
                                {key: 'В поле'},
                                {key: 'Перекресток'}
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
                        <Button
                            onPress={() => {
                                this.props.changePoint(item.key)
                                console.log('resetPoint')
                            }}
                            title='Изменить пункт'
                        />
                        <Button
                            onPress={() => {
                                this.props.synchronization()
                                console.log('synchronization')
                            }}
                            title='Синхронизация'
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
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    item: {
        padding: 10,
        fontSize: 16,
        height: 44
    }
})

//Не работает коннект
export default connect(mapStateToProps, mapDispatchToProps)(ChoosePoint)
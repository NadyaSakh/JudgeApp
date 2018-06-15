import React from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    FlatList,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { ScreenState } from '../../Components/ScreenState'


export const LoadingIndicator = (props) => {
    LoadingIndicator.propTypes = {
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number)
    }
    return <View style={props.style}>
        <ActivityIndicator/>
    </View>
}

export const SingleLineText = (props) => {
    SingleLineText.propTypes = {
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }
    return <Text style={props.style}>{props.text}</Text>
}

export const CompetitionItem = (props) => {
    CompetitionItem.propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }
    return <TouchableHighlight
        onPress={() => {
            props.onPress ?
                props.onPress() :
                Alert.alert('Внимание!', 'Обработчик нажатия не назначен')
        }}>
        <SingleLineText
            style={props.style}
            text={props.text}/>
    </TouchableHighlight>
}

export const CompetitionList = (props) => {
    CompetitionList.propTypes = {
        competitionList: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }
    return (<FlatList
        data={props.competitionList}
        renderItem={({item}) => {
            return (
                <CompetitionItem
                    onPress={() =>
                        props.onPress()}
                    style={props.style}
                    text={item.key}/>
            )
        }}
        keyExtractor={(item, index) => index}
    />)
}

export const Info = (props) => {
    Info.propTypes = {
        styleContainer: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        styleHeader: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }
    return <View styleContainer={props.styleContainer}>
        <SingleLineText
            text={props.text}
            styleHeader={props.styleHeader}
        />
    </View>
}

export const screenError = (props) => {
    screenError.propTypes = {
        screenState: PropTypes.string.isRequired
    }
    if (props.screenState === ScreenState.ERROR)
        return Alert.alert('Ошибка', 'Список соревнований не загружен.')
}

export class ActionContainer extends React.PureComponent {
    static propTypes = {
        screenState: PropTypes.string.isRequired,

        screenLoading: PropTypes.object,
        singleLineText: PropTypes.object,
        touchEffect: PropTypes.object,
        listView: PropTypes.object,
        headOfScreen: PropTypes.object,
        screenError: PropTypes.func,
        content: PropTypes.array,
        onCompetitionPress: PropTypes.func

    }

    render = () => {
        switch (this.props.screenState) {
            case ScreenState.LOADING: {
                return <View>
                    <Info
                        styleContainer={styles.container}
                        text='Выберите соревнование'
                        styleHeader={styles.sectionHeader}
                    />
                    <LoadingIndicator
                        style={styles.container}/>
                </View>
            }

            default: {
                return <View>
                    <Info
                        styleContainer={styles.container}
                        text='Выберите соревнование'
                        styleHeader={styles.sectionHeader}
                    />
                    <CompetitionList
                        competitionList={this.props.content}
                        onPress={() =>
                            this.props.onCompetitionPress()
                        }
                        style={styles.item}
                    />
                </View>
            }
        }

    }
}

export const styles = StyleSheet.create({
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
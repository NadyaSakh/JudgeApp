import React from 'react'
import {
    View,
    TouchableHighlight,
    FlatList,
    StyleSheet,
    Alert
} from 'react-native'
import PropTypes from 'prop-types'

import { ScreenState } from '../../Components/ScreenState'
import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { ScreenError } from '../../Components/ScreenError'
import { LOG } from '../../Utils/logger'

export const CompetitionItem = props => {
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

export const CompetitionList = props => {
    CompetitionList.propTypes = {
        competitionList: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.oneOfType(PropTypes.object, PropTypes.number),
        text: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    }

    onPress = props => {
        onPress.propTypes = {
            onPress: PropTypes.func
        }
        props.onPress()
    }

    return <FlatList
        data={props.competitionList}
        renderItem={({item}) => {
            return (
                <CompetitionItem
                    onPress={this.onPress}
                    style={props.style}
                    text={item.key}/>
            )
        }}
        keyExtractor={(item, index) => index}
    />
}

export const Info = props => {
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

export class ActionContainer extends React.PureComponent {
    static propTypes = {

        screenState: PropTypes.oneOf([
            ScreenState.LOADING,
            ScreenState.CONTENT,
            ScreenState.ERROR
        ]),

        LoadingIndicator: PropTypes.object,
        SingleLineText: PropTypes.object,
        CompetitionList: PropTypes.object,
        Info: PropTypes.object,
        ScreenError: PropTypes.func,
        content: PropTypes.array,
        onCompetitionPress: PropTypes.func

    }

    shouldComponentUpdate = nextProps =>
        nextProps.screenState !== this.props.screenState

    render = () => {
        LOG('render', 'ActionContainer')

        switch (this.props.screenState) {
            case ScreenState.LOADING: {
                return this.renderLoadingView()
            }

            case ScreenState.ERROR: {
                return this.renderErrorView()
            }
            //Чтобы из алерта об ошибке был переход на обычный экран
            default: {
                return this.renderContentView()
            }
        }
    }

    renderLoadingView = () =>
        <View>
            <Info
                styleContainer={styles.container}
                text='Выберите соревнование'
                styleHeader={styles.sectionHeader}
            />
            <LoadingIndicator
                style={styles.container}/>
        </View>

    renderErrorView = () =>
        <ScreenError text='Список соревнований не загружен.'/>

    renderContentView = () =>
        <View>
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
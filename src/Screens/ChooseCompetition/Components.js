import React from 'react'
import {
    View,
    TouchableHighlight,
    FlatList,
    StyleSheet,
    Alert,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { ScreenState } from '../../Components/ScreenState'
import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { LOG } from '../../Utils/logger'
import { Button } from 'react-native'

export const CompetitionItem = props => {
    CompetitionItem.propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
        pointsList: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <SingleLineText
        text={props.text}
        styleHeader={props.styleHeader}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <Info
            text={props.text}
            styleHeader={styles.sectionHeader}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        data: PropTypes.array,
        onCompetitionPress: PropTypes.func,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }

    return <View>
        <Info
            text={props.text}
            styleHeader={styles.sectionHeader}
        />
        <Button
            onPress={props.onCompetitionPress}
            title='Показать'/>
        <Text>Название:{props.name}
        </Text>
        <CompetitionList
            competitionList={props.data}
            onPress={() =>
                props.onCompetitionPress()
            }
            style={styles.item}
        />
    </View>
}

export class ActionContainer extends React.Component {
    static propTypes = {
        screenState: PropTypes.oneOf([
            ScreenState.LOADING,
            ScreenState.CONTENT,
            ScreenState.ERROR
        ]),

        loadingView: PropTypes.object,
        contentView: PropTypes.object.isRequired,
        errorView: PropTypes.object
    }

    render = () => {
        LOG('render', 'ActionContainer')
        switch (this.props.screenState) {
            case ScreenState.LOADING: {
                return this.renderLoadingView()
            }

            case ScreenState.ERROR: {
                return this.renderErrorView()
            }

            case ScreenState.CONTENT: {
                return this.renderContentView()
            }
        }
    }

    renderLoadingView = () => {
        return <View style={styles.container}>
            {this.props.loadingView}
        </View>
    }

    renderErrorView = () => {
        return <View style={styles.container}>
            {this.props.errorView}
        </View>
    }

    renderContentView = () => {
        return <View style={styles.container}>
            {this.props.contentView}
        </View>
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
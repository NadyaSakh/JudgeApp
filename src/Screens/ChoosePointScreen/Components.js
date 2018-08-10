import React from 'react'
import {
    View,
    Button,
    StyleSheet,
    Alert,
    TouchableHighlight,
    FlatList
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'

export const ListItem = props => {
    ListItem.propTypes = {
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

export const PointsList = props => {
    PointsList.propTypes = {
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
        data={props.pointsList}
        renderItem={({item}) => {
            return (
                <ListItem
                    onPress={this.onPress}
                    style={props.style}
                    text={item.key}/>
            )
        }}
        keyExtractor={(item, index) => index}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        styleHeader: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <SingleLineText
            text={props.text}
            styleHeader={styles.sectionHeader}
        />
        <LoadingIndicator/>
    </View>
}


export const ContentView = props => {
    ContentView.propTypes = {
        competitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        points: PropTypes.array,
        onChange: PropTypes.func,
        onNav: PropTypes.func,
        day: PropTypes.string,
        onPointPress: PropTypes.func
    }

    return <View>
        <SingleLineText
            text={`Гонка "${props.competitionName}"`}
            styleHeader={styles.styleHeader}
        />
        <SingleLineText
            text={`Сегодня: ${props.day}`}
            styleHeader={styles.styleHeader}
        />
        <SingleLineText
            text={'Выберите свой пункт:'}
            styleHeader={styles.styleHeader}
        />
        <PointsList
            pointsList={props.points}
            onPress={() =>
                props.onPointPress()
            }
            style={styles.item}
        />
        <View style={styles.container}>
            <Button
                onPress={props.onChange}
                title='Изменить пункт'

            />
            <Button
                onPress={props.onNav}
                title='Перейти к сканированию'
            />
        </View>
    </View>
}

export const styles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 2,
        backgroundColor: 'blue',
        fontSize: 16,
        height: 36
    },
    item: {
        padding: 10,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        height: 44
    },
    container: {
        flexDirection: 'row'
    }
})
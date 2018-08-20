import React from 'react'
import {
    View,
    Button,
    Alert,
    TouchableOpacity,
    FlatList,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'

export const ListItem = props => {
    ListItem.propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
            props.onPress ?
                props.onPress() :
                Alert.alert('Внимание!', 'Обработчик нажатия не назначен')
        }}>
        <SingleLineText
            style={props.style}
            text={props.text}/>
    </TouchableOpacity>
}

export const PointsList = props => {
    PointsList.propTypes = {
        pointsList: PropTypes.array,
        onPointPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    const onPress = props => {

        onPress.propTypes = {
            onPointPress: PropTypes.func
        }

        props.onPointPress()
    }
    // Сохранять id пункта или name и записывать в выбранный пункт
    // Для этого нужна дополнительная функция?

    return <FlatList
        data={props.pointsList}
        renderItem={({item}) => {
            return (
                <ListItem
                    onPress={this.onPress}
                    style={props.style}
                    text={item.name}/>
            )
        }}
        keyExtractor={(item, index) => index}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <SingleLineText
            text={props.text}
            style={styles.textStyle}
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
        isChecked: PropTypes.bool,
        yourPoint: PropTypes.string,
        onPointPress: PropTypes.func
    }

    let text = (props.isChecked ? `Ваш пункт "${props.yourPoint}"` : 'Выберите свой пункт:')

    return <View>
        <SingleLineText
            text={`Гонка "${props.competitionName}"`}
            style={styles.textStyle}
        />
        <SingleLineText
            text={`Сегодня: ${props.day}`}
            style={styles.textStyle}
        />
        <SingleLineText
            text={text}
            style={styles.textStyle}
        />
        <PointsList
            pointsList={props.points}
            onPress={() =>
                props.onPointPress
            }
            style={styles.item}
        />
        {/*<Button*/}
        {/*onPress={props.onChange}*/}
        {/*title='Изменить пункт'*/}
        {/*/>*/}
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={props.onChange}
            >
                <Text style={styles.buttonText}> Изменить пункт </Text>
            </TouchableOpacity>
        </View>
    </View>
}
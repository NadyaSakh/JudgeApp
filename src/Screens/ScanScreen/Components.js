import React from 'react'
import {
    View,
    StyleSheet,
    Button
} from 'react-native'
import PropTypes from 'prop-types'

import { SingleLineText } from '../../Components/SingleLineText'
import { ScanState } from './Constants'
import { Strings } from '../../Strings'

export const ContentView = props => {
    ContentView.propTypes = {
        scanState: PropTypes.oneOf([
            ScanState.SCAN_DISABLE,
            ScanState.POINT_NOT_SELECTED,
            ScanState.POINT_SELECTED
        ]),
        selectedPointName: PropTypes.string,
        judgeName: PropTypes.string,
        onPress: PropTypes.func,
        description: PropTypes.string
    }

    return <View style={styles.container}>
        <SingleLineText
            text={`Вы зашли как: ${props.judgeName}`}
            styleHeader={styles.string}
        />
        {selectScanState({...props})}
    </View>
}

const selectScanState = ({scanState, pointName, description, onPress}) => {
    switch (scanState) {
        case ScanState.POINT_SELECTED: {
            return <EnableScanView pointName={pointName}/>
        }
        case ScanState.POINT_NOT_SELECTED: {
            return <SelectPointView onPress={onPress}/>
        }
        case ScanState.SCAN_DISABLE: {
            return <DisabledScanView description={description}/>
        }
    }
}

const DisabledScanView = props => {
    DisabledScanView.propTypes = {
        description: PropTypes.string
    }
    //description: не начались соревнования /прошли соревнования
    return <SingleLineText
        text={props.description}
        styleHeader={styles.string}
    />
}

const EnableScanView = props => {
    EnableScanView.propTypes = {
        pointName: PropTypes.string
    }
    return <View>
        <SingleLineText
            text={props.pointName}
            styleHeader={styles.string}
        />
        <SingleLineText
            text={Strings.SCANING}
            styleHeader={styles.upperString}
        />
        <SingleLineText
            text={Strings.SCAN_TIP}
            styleHeader={styles.string}
        />
    </View>
}

const SelectPointView = props => {
    SelectPointView.propTypes = {
        onPress: PropTypes.func
    }
    return <View>
        <SingleLineText
            text={Strings.POINT_NOT_SELECTED}
            styleHeader={styles.string}
        />
        <Button
            onPress={props.onPress}
            title='Выбрать пункт'/>
    </View>
}

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    string: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    upperString: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    }
})
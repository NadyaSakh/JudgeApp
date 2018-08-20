import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    textInput: {
        alignSelf: 'stretch'
    },
    textStyle: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14
    },
    loadingStyle: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        color: 'blue'
    },
    item: {
        padding: 10,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        height: 44
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: '#58d6ff',
        borderColor: '#b7ebff',
        padding: 10,
        borderWidth: 0.5
    },
    buttonStyle: {
        backgroundColor: '#2080ff',
        // borderColor: 'blue',
        // borderWidth: 0.5,
        borderRadius: 10
    },
    buttonText: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    centredView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
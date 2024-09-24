import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class Button1 extends Component {
    render() {
        const { text } = this.props;
        return (
            // <View></View>
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={this.props.onPress}
                >
                    <Text style={styles.buttontxt}>
                        {text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2a7bbb',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginHorizontal: 25,


    },
    buttontxt: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,

    },
})

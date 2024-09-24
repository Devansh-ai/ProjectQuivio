import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Icons } from '../Assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Tutorial extends Component {
    componentDidMount = async () => {
        await AsyncStorage.setItem('tutorial', 'true')

    }
    render() {
        return (
            <View>
                <Text></Text>
                <Image
                    style={{ height: '100%', width: '100%' }}
                    resizeMode='cover'
                    source={Icons.tute2}

                />


                <TouchableOpacity style={styles.button} onPress={() => (this.props.navigation.replace('LoginPage'))}>
                    <Text style={{ color: 'white', padding: 5 }}>GET STARTED</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    button: {

        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        marginBottom: '10%',
        marginTop: '160%',
        marginLeft: '35%',
        position: 'absolute'


    },
})

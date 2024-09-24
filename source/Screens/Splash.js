import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { Icons } from '../Assets'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(async () => {
            const tutorial = await AsyncStorage.getItem('tutorial')
            console.log(tutorial);
            if (!tutorial) {
                this.props.navigation.replace('Tutorial')
            }
            else {
                this.props.navigation.replace('LoginPage')
            }

        }, 2000);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Image style={{ height: '100%', width: '100%' }}
                    source={Icons.splash_img}
                    resizeMode='cover' />

            </View>
        )
    }
}

const styles = StyleSheet.create({})

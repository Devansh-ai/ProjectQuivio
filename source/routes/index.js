


import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
// import LoginPage from '../components/LoginPage'
// import CreateAccpage from '../components/CreateAccpage'
// import FirstPage from '../components/FirstPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
// import OtpPage from '../components/OtpPage'
// import VerifyOtp from '../components/verifyEmail'
// import Splash from '../components/Splash'
// import Tutorial from '../components/Tutorial'
import Tutorial from '../Screens/Tutorial';
import Splash from '../Screens/Splash';
import LoginPage from '../Screens/LoginPage';
import ForgotPassword from '../Screens/ForgetPassword';
import ResetPassword from '../Screens/ResetPassword';
import AddPhone from '../Screens/AddPhone';
import Verifyotp from '../Screens/Verifyotp';
import HomeScreen from '../Screens/HomeScreen';
import BottomTab from './bottomTab';

export default class Routes extends Component {
  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AddPhone" component={AddPhone} />
          <Stack.Screen name="Verifyotp" component={Verifyotp} />
          <Stack.Screen name='BottomBar' component={BottomTab} />
          {/* <Stack.Screen name="CreateAccount" component={CreateAccpage} />


            {/* <Stack.Screen name="Profile" component={} />
            <Stack.Screen name="Settings" component={} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})






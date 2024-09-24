import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
//import Routes from './source/routes/index'
import Splash from './source/Screens/Splash'
import Routes from './source/routes'
import Tutorial from './source/Screens/Tutorial'
import LoginPage from './source/Screens/LoginPage'
import ForgotPassword from './source/Screens/ForgetPassword'
import ResetPassword from './source/Screens/ResetPassword'
import AddPhone from './source/Screens/AddPhone'
import Verifyotp from './source/Screens/Verifyotp'
export default class App extends Component {
  render() {
    return (
      // <View>

        // <Tutorial/>
      //   {/* <Splash/> */}

      // </View>
        <Routes/>
        // <AddPhone/>
        // <ResetPassword/>
        // <Verifyotp/>
        // <LoginPage/>
        // <ForgotPassword/>
        
    )
  }
}

const styles = StyleSheet.create({})

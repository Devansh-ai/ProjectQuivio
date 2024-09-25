import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, Animated, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { Icons } from '../Assets'
import {StringAll} from '../Components/Strings'
import { NavigationContainer } from '@react-navigation/native';

import Textinput from '../Components/Textinput'
import Button1 from '../Components/Button1'

const data = [
    {
        img: Icons.vector1,
        Text: 'Aesthetical Graphics'
    },
    {
        img: Icons.vector2,
        Text: 'Realtime Statistics'
    },
    {
        img: Icons.vector3,
        Text: 'Track Equipment Usage'
    },
    {
        img: Icons.vector1,
        Text: 'Aesthetical Graphics'
    },
    {
        img: Icons.vector2,
        Text: 'Realtime Statistics'
    },
    {
        img: Icons.vector3,
        Text: 'Track Equipment Usage'
    },
    {
        img: Icons.vector1,
        Text: 'Aesthetical Graphics'
    },
    {
        img: Icons.vector2,
        Text: 'Realtime Statistics'
    },
    {
        img: Icons.vector3,
        Text: 'Track Equipment Usage'
    },

    {
        img: Icons.vector1,
        Text: 'Aesthetical Graphics'
    },
    {
        img: Icons.vector2,
        Text: 'Realtime Statistics'
    },
    {
        img: Icons.vector3,
        Text: 'Track Equipment Usage'
    },]

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            securetextentry: true,
            email: "",
            password: "",
            errPassword: "",
            erremail: "",
            showSuccess: false,
            toastOpacity: new Animated.Value(0),
            trackCred: 0
        };
    }
    handlesubmit = () => {
        //console.log(this.validateemail);
        //console.log(this.validatepass);
        const {trackCred} = this.state
        if (this.validateemail() && this.validatepass()) {
            //const { showSuccess} = this.state;
            // console.log('>>>>>>>>>>>>>')
            this.props.navigation.replace('BottomBar')
        }
        else{
            if(trackCred>=3){
                
            this.setState({ showSuccess:true })
            }
            else{
                this.showToast()
                this.setState(prevState=>({
                    trackCred:prevState.trackCred+1   
                }))
            }
        }
    }
    validatepass = () => {

        const { password } = this.state;
        // console.log(password)
        if (password.length < 6) {
            //Alert.alert('Invalid Input', 'Password can not be empty');
            this.setState({ errPassword: "Invalid Email Format" })
            return false;
        }
        else {
            this.setState({ errPassword: "" })
        }
        return true;
    }

    validateemail = () => {
        const { email } = this.state;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // console.log(emailPattern.test(email))
        if (!emailPattern.test(email)) {
            //Alert.alert('Invalid Input', 'Invalid Email');

            this.setState({ erremail: "Invalid Email Format" })
            return false;
        } else {
            this.setState({ erremail: "" })
        }



        return true;
    }
    togglepassword = () => {
        this.setState(prevState => ({ securetextentry: !prevState.securetextentry }));
    };

    onChangeEmail = (text) => {
        this.setState({
            email: text
        })
        this.validateemail();
    }
    showToast = () => {
        this.setState({ toastOpacity: new Animated.Value(1) }, () => {
            Animated.timing(this.state.toastOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
    
            setTimeout(() => {
                Animated.timing(this.state.toastOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, 3000);
        });
    };
    
    onChangePassword = (text) => {
        this.setState({
            password: text
        })
        this.validatepass();
    }

    leftComp = (img) => {
        return (
            <Image
                source={img}
                style={styles.leftcomp}
            />
        )
    }
    toggleModal=()=>{
        this.setState({showSuccess:!this.state.showSuccess})
    }

    rightComp = () => {
        return (
            <TouchableOpacity onPress={this.togglepassword}>
                <Image
                    source={this.state.securetextentry ? Icons.eye : Icons.eyeoff}
                    style={styles.rightcomp}
                />
            </TouchableOpacity>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.flat}>
                <Image
                    source={item.img}
                    style={styles.imgvect}

                />
                <Text style={styles.flattxt}>{item.Text}</Text>
            </View>
        </View>
    );
    render() {
        const { erremail } = this.state

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                // keyboardVerticalOffset={100}
                >
                <View style={styles.upper}>
                    <Animated.View style={[styles.toast, { opacity: this.state.toastOpacity }]}>
                        <Text style={styles.toastText}>{StringAll.emailErrorToast}</Text>
                    </Animated.View>
                    <Image
                        style={styles.logo}
                        resizeMode='contain'
                        source={Icons.quiviologo}
                    />

                    {/* <Image
                        style={styles.img1}
                        resizeMode='contain'
                        source={Icons.assistimg}

                    /> */}
                    <Text style={styles.headquivio}>
                        QUIVIO
                    </Text>
                    <Text style={styles.assistant}>

                    {StringAll.carWash}
                    </Text>
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    {/* <Image
        style={styles.img2}
        resizeMode='contain'
        source={Icons.realimg}
        /> */}
                </View>
                <View style={styles.lower}>
                    <Text style={styles.head}>
                        Sign in
                    </Text>
                    <Text style={styles.subhead}>
                        with your valid credentials
                    </Text>
                    <View style={styles.inpbox}>

                        <Textinput
                            //leftIcon={Icons.email} 
                            leftComp={() => this.leftComp(Icons.email)}

                            error={this.state.erremail}
                            onChangeText={this.onChangeEmail}
                            text={"Email Address"} />

                        {/* <Image
                            source={Icons.email}
                            style={styles.img3}
                            /> */}
                    </View>
                    {this.state.erremail && <Text style={{ color: 'red', marginLeft: '10%', }}>Invalid email address entered</Text>}
                    <View style={styles.inpbox}>
                        <Textinput
                            type='password'
                            leftComp={() => this.leftComp(Icons.lock)}
                            rightComp={this.rightComp}
                            rightIcon={this.state.securetextentry ? Icons.eye : Icons.eyeoff}
                            securetextentry={this.state.securetextentry}
                            error={this.state.errPassword}
                            onChangeText={this.onChangePassword}
                            text={"Password"}
                        />

                        {/* <Image
                            source={Icons.lock}
                            style={styles.img3}
                        /> */}
                    </View>
                    {this.state.errPassword && <Text style={styles.passworderror}>Invalid Password</Text>}
                    <TouchableOpacity style={styles.forget} onPress={() => (this.props.navigation.navigate("ForgotPassword"))}>
                        <Text >
                            Forgot Password
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.button}>

                        <Button1 onPress={this.handlesubmit} text={"Primary"} />
                    </View>

                </View>
                   
                <Modal
                    visible={this.state.showSuccess}
                    transparent={true}
                    animationType="slide"
                    
                >
                     <TouchableWithoutFeedback onPress={this.toggleModal}> 
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                source={Icons.key}
                                style={styles.modalimg}
                            />
                            <Text style={styles.modalTitle}>Password Upadated!</Text>
                            <View style={styles.txthead}>

                                <Text style={styles.modaltxt}>Your new password has been updated successfully.</Text>
                            </View>
                            <TouchableOpacity
                                // onPress={() => this.navigation("ResetPassword")}
                                style={styles.modalButton}
                            // onPress={() => this.setState({ showSuccess: false })}
                            >
                                <Text style={styles.modalButtonText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
               
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    headquivio:{fontSize:28,
        color:'white',
        fontWeight:'800',
        marginTop:'35%',
        marginLeft:'7%',
    },
    assistant:{
        color:'white',
        fontSize:17,
        fontWeight:'400',
        marginLeft:'7%',
        marginTop:5,

    },
    modalimg: {
        marginBottom: 20,

    },
    modaltxt: {
        fontSize: 13,
        fontWeight: '400',
        width: 300,
        paddingHorizontal: 50,
        color: '#60707d',
        alignSelf: 'center',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#2a7bbb',
        padding: 10,
        borderRadius: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',

    },
    forget: {
        alignItems: 'flex-end',
        marginRight: '6%',
        marginTop: '4%',
    },
    button: {

        marginTop: '13%'
    },
    img3: {
        position: 'absolute',
        marginLeft: '10%',
        marginTop: '7%',
    },
    rightcomp: {
        height: 20,
        width: 20,
        zIndex: 1,
        position: 'absolute',
        right: 50,
        top: 30
    },
    leftcomp: {
        height: 20,
        width: 20,
        zIndex: 1,
        position: 'absolute',
        //right: 30,
        left: 40,
        top: 30
    },
    passworderror:
        { color: 'red', marginLeft: '10%', },

    inpbox: {
        flexDirection: 'row',
    },
    textin: {
        borderRadius: 8,
        backgroundColor: 'white',
        width: 345,
        height: 60,
        marginHorizontal: '7%',
        // padding:'8%',
        paddingHorizontal: '13%',
        marginVertical: '2.5%',
        // aspectRatio:16/9,
    },
    flattxt: {
        // marginLeft:'2%',
        color: 'white',
        marginLeft: 10,
        fontWeight: '300',
        fontSize: 15,

        // backgroundColor:'red',
    },
    imgvect: {
        height: 17,
        width: 17,
        marginTop: 8,
        // backgroundColor:'red',
    },
    flat: {
        flexDirection: 'row',
        //marginTop:'15%',
        //width:'60%',
        width: 128,
        // justifyContent:'space-between'
        // backgroundColor:'red',
        //marginStart:20,
        //  marginEnd:5
    },
    item: {
        flex: 1,
        marginTop: '35%',
        marginBottom: 10,
        //marginLeft:'10%',
        // backgroundColor:'red',
        //alignItems:'space-evenly',
        marginStart: 30,
    },
    subhead: {
        fontSize: 15,
        fontWeight: '400',
        color: '#4e5f71',
        marginLeft: '8%',
        marginBottom: '8%',
    },
    head: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: '8%',
        marginTop: '7%',
        marginBottom: '2%',
    },
    img2: {
        position: 'relative',
        marginTop: '18%',
        //marginLeft:'10%'
        width: 393,
        height: 34,

    },
    img1: {
        position: 'relative',
        marginTop: '35%',
        marginLeft: '10%',
        // width:298,
        // height:64,
    },
    logo: {
        height: 55,
        width: 82,
        left: '7%',
        top: '25%',
        // marginVertical:30,
        // marginHorizontal:30,
    },
    container: {
        flex: 1,

    },
    upper: {
        flex: 0.43,
        backgroundColor: '#3895c7',
        //backgroundColor:'red',
    },
    lower: {
        flex: 0.57,
        backgroundColor: '#e7edf3',
    },
    toast: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        backgroundColor: '#D32F2F',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        zIndex: 1,
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
    },
})

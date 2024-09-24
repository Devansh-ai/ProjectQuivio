import { Text, StyleSheet, Image, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Modal } from 'react-native'
import React, { Component } from 'react'
import { Icons } from '../Assets'
import Textinput from '../Components/Textinput'
import Button1 from '../Components/Button1';
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            securetextentrypass: true,
            securetextentryconpass: true,
            pass: '',
            conpass: '',
            errpass: '',
            errconpass: '',
            showSuccess: false,
        }

    }
    togglepassword = () => {
        this.setState(prevState => ({ securetextentrypass: !prevState.securetextentrypass }));
    };
    toggleconpassword = () => {
        this.setState(prevState => ({ securetextentryconpass: !prevState.securetextentryconpass }));
    };
    leftComppass = (img) => {
        return (
            <Image
                source={img}
                style={[styles.leftcomp,
                this.state.errpass && { tintColor: "red" }
                ]}
            />
        )
    }
    leftCompconpass = (img) => {
        return (
            <Image
                source={img}
                style={[styles.leftcomp,
                this.state.errconpass && { tintColor: "red" }
                ]}
            />
        )
    }

    rightCompconpass = () => {
        return (
            <TouchableOpacity onPress={this.toggleconpassword}>
                <Image
                    source={this.state.securetextentryconpass ? Icons.eye : Icons.eyeoff}
                    style={styles.rightcomp}
                />
            </TouchableOpacity>
        )
    }
    rightComppass = () => {
        return (
            <TouchableOpacity onPress={this.togglepassword}>
                <Image
                    source={this.state.securetextentrypass ? Icons.eye : Icons.eyeoff}
                    style={styles.rightcomp}
                />
            </TouchableOpacity>
        )
    }
    validatepass = (pass) => {
        // console.log(password)
        if (pass.length < 6) {
            //Alert.alert('Invalid Input', 'Password can not be empty');
            this.setState({ errpass: "Invalid Email Format" })
            return false;
        }
        else {
            this.setState({ errpass: "" })
        }
        return true;
    }
    validateconpass = (conpass) => {
        const { pass } = this.state;
        if (pass !== conpass) {

            this.setState({ errconpass: "Invalid Email Format" })
            return false;
        }
        else {
            this.setState({ errconpass: "" })
        }
        return true;
    }

    handleSendLink = () => {
        if (this.validatepass(this.state.pass) && this.validateconpass(this.state.conpass)) {
            this.setState({ showSuccess: true });
        } else {
            // this.setState({ isEmailValid: false });
            // this.showToast();
        }
    }
    navigation = () => {
        this.props.navigation.navigate('AddPhone')
        this.setState({ showSuccess: false });
    }
    onChangePassword = (text) => {
        this.setState({
            pass: text
        }, () => { this.validatepass(this.state.pass) })
    }
    onChangeconPassword = (text) => {
        this.setState({
            conpass: text
        }, () => {
            this.validateconpass(this.state.conpass)
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
                <ScrollView >
                    <Image
                        source={Icons.colorQuiviologo}
                        style={styles.quiviologo}
                        resizeMode='contain'
                    />
                    <Text style={styles.head}>
                        Reset Password
                    </Text>
                    <Text style={styles.subhead}>
                        Enter in your new password
                    </Text>
                    <Textinput
                        type='password'
                        leftComp={() => this.leftComppass(Icons.lock)}
                        rightComp={this.rightComppass}
                        text={"Password"}
                        securetextentry={this.state.securetextentrypass}
                        error={this.state.errpass}
                        onChangeText={this.onChangePassword}
                    />
                    <Textinput
                        leftComp={() => this.leftCompconpass(Icons.lock)}
                        rightComp={this.rightCompconpass}
                        type='password'
                        text={"Confirm Password"}
                        error={this.state.errconpass}
                        securetextentry={this.state.securetextentryconpass}
                        onChangeText={this.onChangeconPassword}
                    />
                </ScrollView>

                <View style={{ flex: .8, justifyContent: 'space-evenly' }}>
                    {/* <Button1
                    
                        text={"Submit"}
                    /> */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSendLink}

                    >
                        <Text style={styles.buttonText}>Send Link</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={this.state.showSuccess}
                    transparent={true}
                    animationType="slide"
                >
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
                                onPress={() => this.navigation()}
                                style={styles.modalButton}
                            // onPress={() => this.setState({ showSuccess: false })}
                            >
                                <Text style={styles.modalButtonText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    subhead: {
        marginTop: 7,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        color: '#4f7f72',
        fontWeight: '400',
        fontSize: 15,
    },
    head: {
        fontWeight: '700',
        fontSize: 24,
        marginTop: 40,
        marginHorizontal: 15,
        paddingHorizontal: 15,
    },
    quiviologo: {
        height: 55,
        width: 83,
        marginTop: '20%',
        marginLeft: 40,
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
    container: {
        flex: 1,
        backgroundColor: '#e7edf3',

    },

    txthead: {
        // width:'60%',
        paddingLeft: 15,
        //backgroundColor:'red',
    }, modalimg: {
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
    button: {
        backgroundColor: '#2a7bbb',
        // padding: 15,
        borderRadius: 5,
        width: '90%',
        // width:344,
        height: 56,

        // paddingHorizontal:130,
        // marginHorizontal:10,
        alignItems: 'center',
        //    marginStart:30,
        //    marginEnd:30,
        // marginHorizontal:10,
        marginLeft: 18,
        justifyContent: 'center',
        //marginTop:'80%',



    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})
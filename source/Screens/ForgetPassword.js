import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Modal, Animated, Image } from 'react-native';

import { Icons } from '../Assets';






class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailValid: true,
            showSuccess: false,
            toastOpacity: new Animated.Value(0),
        };
    }

    validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    

    handleEmailChange = (text) => {
        const isValid = this.validateEmail(text) || text === '';
        this.setState({
            email: text,
            isEmailValid: isValid
        });

        if (!isValid && text !== '') {
            this.showToast();
        } else {
            this.hideToast();
        }
    }

    handleSendLink = () => {
        if (this.validateEmail(this.state.email)) {
            this.setState({ showSuccess: true });
        } else {
            this.setState({ isEmailValid: false });
            this.showToast();
        }
    }

    showToast = () => {
        Animated.timing(this.state.toastOpacity, {
            toValue: 1,
            useNativeDriver: true,

        }).start();
    }
    handleModalClick = () => {
        this.setState({
            showSuccess: false
        })
        this.props.navigation.navigate("ResetPassword")


    }

    hideToast = () => {
        Animated.timing(this.state.toastOpacity, {
            toValue: 0,
            useNativeDriver: true,


        }).start();
    }

    render() {
        const { isEmailValid, email, toastOpacity } = this.state;

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
                    <Text style={styles.toastText}>Email not found. Contact admin.</Text>
                </Animated.View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()} >

                        <Image
                            source={Icons.back}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>Reset your password with just a few clicks</Text>


                    <View style={[
                        styles.inputContainer,
                        !isEmailValid && styles.inputContainerError
                    ]}>
                        <Image
                            source={Icons.email}
                            tintColor={isEmailValid ? "" : "#D32F2F"}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={this.handleEmailChange}
                            keyboardType="email-address"
                        />
                    </View>


                    {!isEmailValid && (
                        <Text style={styles.errorText}>Email is invalid</Text>
                    )}

                    <TouchableOpacity
                        style={[styles.button, !isEmailValid && styles.buttonDisabled]}
                        onPress={this.handleSendLink}
                        disabled={!isEmailValid}
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
                                source={Icons.target}
                                style={styles.modalimg}
                            />
                            <Text style={styles.modalTitle}>Link Sent !</Text>
                            <View style={styles.txthead}>

                                <Text style={styles.modaltxt}>The link to reset your password has been sent on your email address.</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.handleModalClick()}
                                style={styles.modalButton}
                            // onPress={() => this.setState({ showSuccess: false })}
                            >
                                <Text style={styles.modalButtonText}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    modalimg: {
        marginBottom: 20,

    },
    txthead: {
        // width:'60%',
        //backgroundColor:'red',
    },
    modaltxt: {
        fontSize: 13,
        fontWeight: '400',
        width: 300,
        paddingHorizontal: 40,
        color: '#60707d'

    },
    container: {
        flex: 1,
        backgroundColor: '#e7edf3',
    },
    content: {

        flex: 0.7,
        padding: 20,
        justifyContent: 'center',
        alignItems: ''
    },
    back: {
        position: 'absolute',
        top: '15%',
        marginLeft: '5%'
        //marginTop:'0%'
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        // textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        // textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        //borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    inputContainerError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    inputIcon: {
        padding: 10,
        marginLeft: 10,
    },
    input: {

        flex: 1,
        padding: 10,
        height: 60,
        borderRadius: 8,

    },
    errorText: {
        color: '#D32F2F',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2a7bbb',
        // padding: 15,
        borderRadius: 5,
        width: '100%',
        // width:344,
        height: 56,

        // paddingHorizontal:130,
        // marginHorizontal:10,
        alignItems: 'center',
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
});

export default ForgotPassword;
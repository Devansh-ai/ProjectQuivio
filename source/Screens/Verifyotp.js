import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import Button1 from '../Components/Button1';
import { Icons } from '../Assets/index';
import Modals from '../Components/Modal';

class Verifyotp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ['', '', '', '', '', ''],
            count: 0,
            modalVisible: false,
            head: '',
            des: '',
        };
        this.inputs = Array.from({ length: 6 }, () => createRef()); // Create refs for the OTP inputs
        this.toastOpacity = new Animated.Value(0);
    }

    showToast = () => {
        Animated.timing(this.toastOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            Animated.timing(this.toastOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        }, 2000);
    };

    onSubmit = () => {
        const { otp, count } = this.state;
        if (otp.join('') === '222222') {
            this.setState({
                head: 'Account Verified!',
                des: 'Your account has been verified successfully.',
                modalVisible: true,
            });
        } else {
            this.setState({ count: count + 1 }, () => {
                if (this.state.count >= 2) {
                    this.setState({
                        head: 'Too many failed attempts',
                        des: 'Your account has been locked, please try again in one hour.',
                        modalVisible: true,
                    });
                }
            });
            this.showToast();
        }
    };

    handleChange = (text, index) => {
        const newOtp = [...this.state.otp];
        newOtp[index] = text;
        this.setState({ otp: newOtp });

        if (text !== '' && index < 5) {
            this.inputs[index + 1].current.focus(); // Ensure ref is accessed properly
        }
    };

    handleKeyPress = (key, index) => {
        if (key === 'Backspace' && this.state.otp[index] === '' && index > 0) {
            this.inputs[index - 1].current.focus(); // Ensure ref is accessed properly
        }
    };

    render() {
        const { navigation } = this.props;
        const { otp, modalVisible, head, des } = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icons.back} style={styles.backimage} />
                </TouchableOpacity>
                <Animated.View style={[styles.toast, { opacity: this.toastOpacity }]}>
                    <Text style={styles.toastText}>
                        User exists. Try a different number.
                    </Text>
                </Animated.View>
                <Text style={styles.header}>Verify Account Access</Text>
                <Text style={styles.subheader}>Enter the verification code sent to</Text>
                <Text style={styles.subheadernumber}>+1-788-895-5435.</Text>
                <View style={styles.otpContainer}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            ref={this.inputs[index]} // Use the correct ref
                            style={styles.input}
                            value={value}
                            keyboardType="number-pad"
                            maxLength={1}
                            onChangeText={text => this.handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent.key, index)}
                        />
                    ))}
                </View>
                <View style={styles.forgotpass}>
                    <TouchableOpacity>
                        <Text style={styles.forgottext}>Resend</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: '2%' }}>
                    <Button1 text={'Confirm Code'} onsubmit={this.onSubmit} />
                </View>
                <Modals visible={modalVisible} onClose={() => navigation.navigate("SignIn")} headtext={head} destext={des} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subheadernumber: {
        marginLeft: 17,
        marginBottom: 20,
        fontWeight: '700',
        fontSize: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#f2f3f7',
    },
    backimage: {
        position: 'absolute',
        bottom: 100,
        left: 10,
        height: 45,
        width: 45,
    },
    forgotpass: { alignItems: 'flex-end' },
    forgottext: {
        margin: 5,
        padding: 10,
        marginRight: '5%',
        fontSize: 14,
        fontWeight: '600',
    },
    header: {
        width: '80%',
        marginLeft: 17,
        justifyContent: 'flex-start',
        fontSize: 24,
        fontWeight: '800',
    },
    subheader: {
        marginLeft: 17,
        fontSize: 14,
        color: '#4F5F72',
        marginTop: 4,
        fontWeight: '400',
    },
    otpContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
    },
    input: {
        backgroundColor: 'white',
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
    },
    toast: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        backgroundColor: '#D32F2F',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Verifyotp;

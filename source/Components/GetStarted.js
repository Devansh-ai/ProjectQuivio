import React, { Component, createRef } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icons } from '../Assets';

import { ScreenNames } from '../../navigator/screennames';

export default class GetStarted extends Component {
    refRBSheet = createRef();

    componentDidUpdate(prevProps) {
        const { visible } = this.props;
        if (visible !== prevProps.visible) {
            if (visible) {
                this.refRBSheet.current.open();
            } else {
                this.refRBSheet.current.close();
            }
        }
    }

    handleLogin = () => {
        // this.props.onClose
        const { navigation } = this.props;
        // Navigate to Phone screen
        navigation.navigate('AddPhone');
        this.refRBSheet.current.close()
    };

    render() {
        const { onClose } = this.props;

        return (
            <RBSheet
                ref={this.refRBSheet}
                closeOnPressMask
                useNativeDriver={false}
                height={Dimensions.get('window').height / 1.5}
                style={{ overflow: 'hidden' }}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    container: {
                        borderRadius: 20
                    }
                }}
                onClose={onClose}>
                <View style={styles.bgColor}>
                    <View style={styles.centerImage}>
                        <Image style={styles.imageSize} source={Icons.getBackImg} />
                    </View>
                    <View style={styles.commonMargin}>
                        <Text style={styles.headingText}>Secure your Account ?</Text>
                        <Text style={styles.headingDescription}>
                            Setup two-factor authentication to secure{'\n'}your account in
                            just two steps.
                        </Text>
                    </View>

                    <View style={styles.commonMargin}>
                        <View style={styles.rowContainer}>
                            <Image style={styles.iconSize}
                                source={Icons.linkPhone2} />
                            <Text style={styles.containerText}>Link your account with your phone{'\n'}number</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Image style={styles.iconSize}
                                source={Icons.oneTimePass} />
                            <Text style={styles.containerText}>Enter the one-time passcode</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Image style={styles.iconSize}
                                source={Icons.secureAccount} />
                            <Text style={styles.containerText}>Secure your account</Text>
                        </View>
                    </View>

                    <View style={styles.marginSide}>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                onPress={this.handleLogin}>
                                <Text style={styles.getStartedBtn}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </RBSheet>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E6EDF3',
        borderRadius: 50,
    },
    bgColor: {
        flex: 1,
        backgroundColor: '#E6EDF3',
    },
    centerImage: {
        marginTop: 32,
        marginHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageSize: {
        height: 148,
        width: 111,
    },
    commonMargin: {
        marginHorizontal: 33,
        marginTop: 24,
    },
    headingText: {
        fontWeight: '700',
        color: '#0B1721',
        fontSize: 24,
    },
    headingDescription: {
        marginTop: 8,
        color: '#4D5876',
        fontWeight: '400',
        fontSize: 15,
    },
    marginSide: {
        marginTop: 36,
        marginHorizontal: 24,
    },
    iconSize: {
        height: 65,
        width: 65,
        resizeMode: 'cover',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#122636',
        marginTop: -2,
        marginStart: 4,
    },

    btnContainer: {
        backgroundColor: '#2A7BBB',
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
    },
    getStartedBtn: {
        color: '#ffffff',
        paddingVertical: 17,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
});


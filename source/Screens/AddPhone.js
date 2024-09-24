import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, navigation, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal';

import { Icons } from '../Assets';
import { useNavigation } from '@react-navigation/native';


const AddPhone = ({ navigation }) => {
    // const navigation = useNavigation();
    const [countryCode, setCountryCode] = useState('US');
    const [Phone, SetPhone] = useState("");
    const [country, setCountry] = useState(null);

    const handleSubmit = () => {
        navigation.navigate('Verifyotp')

    };

    const handleSelectCountry = (country) => {
        setCountryCode(country.cca2);
        setCountry(country);
    };
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <ScrollView >
                {/* <View style={styles.container}> */}

                <View style={styles.greyContain}>
                    <TouchableOpacity onPress={navigation.goBack}>

                        <Image
                            style={styles.back}
                            source={Icons.back1}
                        // tintColor='black'
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.headText}>
                        Add Phone Number
                    </Text>

                    <Text style={styles.greyText}>
                        To initiate the two-factor authentication, provide your phone number below
                    </Text>
                </View>
                <View style={styles.textInput}>

                    <View style={styles.ccpContain}>

                        <View style={styles.countryImg}>
                            <Image
                                style={styles.arrow}
                                source={Icons.downArrow}
                            />
                            <CountryPicker
                                withFilter
                                withFlag

                                withCallingCode
                                onSelect={handleSelectCountry}
                                //containerButtonStyle={styles.countryPickerButton}
                                countryCode={countryCode}
                            />
                        </View>



                    </View>
                    <View style={styles.numberContain}>
                        <View >
                            {country && (
                                <Text style={styles.countryCodeText}>
                                    +{country.callingCode[0]}
                                </Text>
                            )}
                        </View>

                        <TextInput
                            placeholder="Phone Number"
                            style={styles.input}
                            value={Phone}
                            keyboardType='number-pad'
                            placeholderTextColor='#60707d'
                            maxLength={10}

                            onChangeText={(text) => SetPhone(text)}
                        />
                    </View>

                </View>
            </ScrollView>
            <View style={styles.touchContain}>
                <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
                    <Text style={styles.text}>
                        Send Code
                    </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default AddPhone

const styles = StyleSheet.create({
    arrow: {
        // marginLeft:30,
        marginTop: 15,
    },
    countryImg: {
        borderRadius: 30,
        flexDirection: 'row-reverse',
        // height:80,
        // width:60,
    },
    back: {
        // tintColor:'black',
        marginTop: '17%',
        height: 30,
        width: 30,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },

    container: {
        flex: 1,
        backgroundColor: "#e7edf3"
    },
    textContainer: {
        marginStart: 25,
        marginTop: 60
    },
    headText: {
        fontSize: 24,
        marginBottom: 12,
        fontWeight: "700"
    },
    greyText: {
        color: '#4f5f72',
        width: 280
    },
    numberContain: {
        height: 60,
        width: 240,
        borderRadius: 7,
        borderColor: "#ccc",
        //borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 25,

        padding: 10,
        flexDirection: 'row',

        marginLeft: 20
    },

    ccpContain: {
        height: 60,
        width: 60,
        borderRadius: 7,
        borderColor: "#ccc",
        //borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flexDirection: 'row',
        marginStart: 27,
        marginTop: 30
    },
    input: {
        alignItems: 'center',
        marginLeft: 20,
        color: 'black',
        //height:60,
    },

    touch: {
        backgroundColor: '#2a7bbb',
        // padding: 15,
        borderRadius: 8,
        width: '90%',
        // width:344,
        height: 56,

        // paddingHorizontal:130,
        // marginHorizontal:10,
        alignItems: 'center',
        //    marginStart:30,
        //    marginEnd:30,
        // marginHorizontal:10,
        // marginLeft:1,
        marginHorizontal: 15,
        justifyContent: 'center',
        //marginTop:'80%',



    },

    text: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
    },
    touchContain: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .3,
    },

    greyContain: {
        //     width:40,
        //     height:40,
        //    // backgroundColor:"#ccc",
        //     opacity:0.4,
        //     marginTop:40,
        //     marginStart:20,
        //     borderRadius:7
    },
    countryCodeText: {
        alignItems: 'center',

        color: 'black',
    },



})
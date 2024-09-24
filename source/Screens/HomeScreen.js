import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView, StyleSheet,
} from 'react-native';

import { Icons } from '../Assets';
//import {Images} from '../../assets/images';
import GetStarted from '../Components/GetStarted';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGetStartedVisible: false,

            benefits: [
                { id: '1', title: 'Create\nCompaign', img: Icons.micIcon },
                { id: '2', title: 'One Time\nTrigger', img: Icons.timeIcon },
                { id: '3', title: 'Create\nCompaign', img: Icons.micIcon },
                { id: '4', title: 'One Time\nTrigger', img: Icons.timeIcon },
            ],

            data: [
                {
                    id: 1,
                    img: Icons.personIcon2,
                    title1: 'Successfully configured POS for sites',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 2,
                    img: Icons.personIcon2,
                    title1: 'You ended the campaign Holiday Special',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 3,
                    img: Icons.personIcon2,
                    title1: 'Created a campaign Holiday Special',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 4,
                    img: Icons.personIcon2,
                    title1: 'Activated the user access group named Site manager',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 5,
                    img: Icons.personIcon2,
                    title1: 'Added a discount code to a campaign named Holiday Special',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 6,
                    img: Icons.personIcon2,
                    title1: 'Added a new customer C02039',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 7,
                    img: Icons.personIcon2,
                    title1: 'Successfully configured POS for sites',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 8,
                    img: Icons.personIcon2,
                    title1: 'Activated the user access group named Site Managers',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 9,
                    img: Icons.personIcon2,
                    title1: 'Successfully configured POS for sites',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
                {
                    id: 10,
                    img: Icons.personIcon2,
                    title1: 'You ended the campaign Holiday Special',
                    title2: 'Jun 3, 2023 | 12:30 PM',
                },
            ],
        };
    }

    handleNav = () => {
        const { navigation } = this.props;
        navigation.navigate('LoginPage');
    };

    handleBottomSheet = () => {
        this.setState({ isGetStartedVisible: true });
    };

    renderItem = ({ item }) => (
        <View style={styles.unload}>
            <View style={styles.imgView}>
                <Image style={styles.img1}
                    source={item.img} />
            </View>
            <Text style={styles.frequentText}>{item.title}</Text>
        </View>
    );

    renderItemVertical = ({ item }) => (

        <View style={styles.unloadVertical}>
            <View style={styles.imgViewVertical}>
                <Image style={styles.img2}
                    source={item.img} />
            </View>
            <View>
                <Text style={styles.frequentTextV1}>{item.title1}</Text>
                <Text style={styles.frequentTextV2}>{item.title2}</Text>
            </View>
        </View>

    );

    seperate = () => {
        return (
            <View style={{
                borderBottomWidth: 1,
                marginHorizontal: 16,
                borderColor: 'lightgrey'
            }} />
        )
    }

    render() {
        const { isGetStartedVisible } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={styles.containerTop}>
                        <View>
                            <Text style={styles.welcome}>
                                Welcome<Text style={styles.name}>{'\n'}Kevin</Text>
                            </Text>
                        </View>
                        <View style={styles.horizontal}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity onPress={this.handleNav}>
                                    <Image style={styles.image} source={Icons.chatIcon} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.imageContainer}>
                                <TouchableOpacity onPress={this.handleBottomSheet}>
                                    <Image style={styles.image} source={Icons.notificationIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>

                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>


                        <View style={styles.setupCont}>
                            <View style={styles.setupimgBox}>
                                <Image style={styles.imgsetup}
                                    source={Icons.completeSetupIcon} />
                            </View>
                            <View>
                                <Text style={styles.head}>Complete your account setup</Text>
                                <Text style={styles.descr}>Tap to continue</Text>
                            </View>

                        </View>

                        <Text style={styles.frequently}>FREQUENTLY USED</Text>
                        <View style={styles.flatCont}>
                            <FlatList
                                bounces={false}
                                horizontal
                                data={this.state.benefits}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.recent}>
                            <Text style={styles.recent1}>RECENT ACTIVITIES</Text>
                            <TouchableOpacity><Text style={styles.recent2}>All Product ▼</Text></TouchableOpacity>
                        </View>
                        <View style={styles.secondBoxCont}>
                            <FlatList
                                bounces={false}
                                data={this.state.data}
                                renderItem={this.renderItemVertical}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this.seperate}
                            />
                        </View>
                    </ScrollView>


                </View>

                <GetStarted
                    navigation={this.props.navigation}
                    visible={isGetStartedVisible}
                    onClose={() => this.setState({ isGetStartedVisible: false })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E7EDF3',
        flex: 1,
    },
    container2: {
        backgroundColor: '#2A7BBB',
    },
    containerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginTop: 59,
        marginBottom: 20,
    },
    welcome: {
        fontWeight: '400',
        fontSize: 18,
        color: '#fff',
    },
    name: {
        fontWeight: '600',
        fontSize: 20,
        color: '#fff',
    },
    horizontal: {
        flexDirection: 'row',
    },
    image: {
        width: 24,
        height: 24,
    },
    imageContainer: {
        backgroundColor: '#3E88C2',
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    setupCont: {
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#d9e2ee',
        padding: 20,
    },
    head: {
        fontWeight: '700',
        fontSize: 15,
        color: '#164061',
    },
    descr: {
        fontWeight: '500',
        fontSize: 13,
        color: '#60707D',
    },
    setupimgBox: {
        marginRight: 16,
    },
    imgsetup: {
        width: 36,
        height: 36,
    },
    frequently: {
        marginLeft: 16,
        marginTop: 32,
        color: '#525454',
        fontSize: 12,
        fontWeight: '600',
    },
    flatCont: {
        marginVertical: 16,
    },

    imgView: {
        backgroundColor: '#46A4BA',
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    img1: {
        height: 24,
        width: 24,
    },
    img2: {
        height: 40,
        width: 40,
    },
    imgViewVertical: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    recent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 16,
    },
    recent1: {
        color: '#525454',
        fontWeight: '600',
        fontSize: 12,
    },
    recent2: {
        color: '#23679D',
        fontSize: 13,
        fontWeight: '600',
    },
    frequentTextV1: {
        color: '#0E1F2C',
        fontWeight: '600',
        paddingHorizontal: 5,
    },
    frequentTextV2: {
        color: '#85929C',
        fontSize: 12,
        paddingHorizontal: 5,
        fontWeight: '500',
    },

    unload: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginLeft: 16,
        backgroundColor: '#F8F9F9',
        flexDirection: 'row',
        padding: 12,
        paddingRight: 16,
        alignItems: 'center',
    },
    unloadVertical: {
        backgroundColor: '#F8F9F9',
        flexDirection: 'row',
        padding: 18,
        borderRadius: 8,
    },

    secondBoxCont: {
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#F8F9F9',
        marginBottom: 15
    },
});

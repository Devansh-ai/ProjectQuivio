import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StringAcc } from '../Components/Strings';
import { Icons } from '../Assets/index';
import TextinputOutlined from '../Components/TextinputOutlined';
import Button1 from '../Components/Button1';
import CalendarPicker from "react-native-calendar-picker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: '',
      selectedStartDate: null,
      isModalVisible: false,
      isModalVisible1: false
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  uploadImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res.didCancel) {
        console.log("user cacelled image picker");
      }
      else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      else {
        console.log("/////////////////")
        let source = res;
        console.log()
        this.setState({
          resourcePath: source?.assets[0]?.uri,
          isModalVisible1: false
        });
      }
    })
  }

  useCamera = () => {
    launchCamera({ mediaType: 'photo' }, res => {
      if (res.didCancel) {
        console.log("user cacelled camera");
      }
      else if (res.error) {
        console.log('Camera Error: ', res.error);
      }
      else {
        console.log("/////////////////")
        let source = res;
        console.log()
        this.setState({
          resourcePath: source?.assets[0]?.uri,
          isModalVisible1: false

        });
      }
    });
  };
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      isModalVisible: false,
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  toggleModal1 = () => {
    this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  };

  rightComp = () => {
    return (
      <TouchableOpacity onPress={this.toggleModal}>
        <Image
          source={Icons.calender}
          style={styles.calender}
        />
      </TouchableOpacity>
    );
  }
  rightCompGender = () => {
    return (
      <TouchableOpacity >
        <Image
          source={Icons.arrow}
          style={styles.arrow}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { selectedStartDate, isModalVisible } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString().substring(0, 15) : "";

    return (
      <SafeAreaView>
        <View>
          <Text style={styles.head}>
            {StringAcc.head}
          </Text>
        </View>
      
        <View style={styles.profPhoto}>
          {
            this.state?.resourcePath?
            <Image
            // source={Icons.profilePhoto}
            source={{uri:`${this.state.resourcePath}`}}
            style={styles.img}
          />:
          <Image
            // source={Icons.profilePhoto}
            source={Icons.profilePhoto}
            style={styles.img}
          />
          }
         
          <View style={{ flexDirection: 'column', marginTop: '20%', marginLeft: '4%' }}>
            <Text style={styles.profPic}>
              {StringAcc.profRight1}
            </Text>
            <TouchableOpacity onPress={this.toggleModal1}>
              <Text style={styles.changePic}>
                {StringAcc.profRight2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextinputOutlined
          text={"Name"}

        />
        <TextinputOutlined
          text={"Username"}

        />
        <TextinputOutlined
          rightComp={this.rightComp}
          text={"Birthday"}
          value={startDate || "10/10/1998"}
        />
        <TextinputOutlined
          text={"Gender"}
          rightComp={this.rightCompGender}

        />
        <TextinputOutlined
          text={"Name"}

        />
        <TextinputOutlined
          text={'Email ID'}

        />

        <Button1
          text={'Update'}
        />


        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
        // onRequestClose={this.toggleModal}

        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>


            <View style={styles.modalContainer}>
              <View style={styles.calendarContainer}>
                <CalendarPicker
                  onDateChange={this.onDateChange}
                />
                <TouchableOpacity onPress={this.toggleModal} style={styles.modalButton}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isModalVisible1}
        //onRequestClose={}
        >
          <Pressable onPress={this.toggleModal1} style={styles.modal1press} >

            <View style={{ backgroundColor: 'white' ,height : '50%' , justifyContent : 'flex-start', borderRadius : 15}}>
              <View>
                <Text style={styles.modalhead}>
                  Profile Photo
                </Text>
              </View>

              <TouchableOpacity onPress={this.uploadImageFromGallery}>
                <View style={{ backgroundColor: '#F6F9FA', padding: 20, marginHorizontal: 20, borderRadius: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={Icons.galleryUpload} style={{ height: 44, width: 44 }} />
                    <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft: 20 }}>Upload From the Gallery</Text>
                  </View>

                  <Image source={Icons.arrow} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.useCamera}>
                <View style={{ backgroundColor: '#F6F9FA', padding: 20, marginHorizontal: 20, borderRadius: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={Icons.cameraUpload} style={{ height: 44, width: 44 }} />
                    <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft: 20 }}>Use Camera</Text>
                  </View>

                  <Image source={Icons.arrow} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ backgroundColor: '#F6F9FA', padding: 20, marginHorizontal: 20, borderRadius: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={Icons.avatarUpload} style={{ height: 44, width: 44 }} />
                    <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft: 20 }}>Select an Avatar</Text>
                  </View>

                  <Image source={Icons.arrow} />
                </View>
              </TouchableOpacity>

            </View>




          </Pressable>




        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  arrow:{
    right: 60,
    top: '50%',
    height:15,
    width:10,
    transform: [{rotate: '90deg'}]
  },
  modalhead: {
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 10,
    paddingTop:40,
    marginLeft:20,
    color:'black',
    //borderBottomWidth: 2,
    //borderBottomColor: 'black',

  },
  modal1press: {
    backgroundColor : 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor:'white',

  },
  modalButton: {
    // backgroundColor:'skyblue',
    marginLeft: 20,
    paddingBottom: 20,

  },
  changePic: {
    color: "#EE28A9",
    fontSize: 16,
    fontWeight: '500',
  },
  profPic: {
    fontSize: 14,
    fontWeight: '450',
    color: '#4B5879',
  },
  calender: {
    height: 20,
    width: 20,
    right: 60,
    top: 35,
  },
  profPhoto: {
    flexDirection: 'row',
  },
  img: {
    height: 140,
    width: 140,
    backgroundColor: '#e1ebfe',
    borderRadius: 80,
    marginTop: '9%',
    marginLeft: '5%',
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  modalContainer: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    // margin:20,
    // padding:20,
    marginTop: '107%',

    width: '100%'
  },
  calendarContainer: {
    backgroundColor: 'white',
    //marginHorizontal: 20,
    borderRadius: 10,
    // bottom:0,
    //padding: 10,
    // paddingHorizontal:'40%',

    // margin
    // padding:-10
  },
  closeButton: {
    marginTop: 20,
    color: '#EE28A9',
    textAlign: 'center',
    fontSize: 16,
    // backgroundColor:'blue',
  },
});

import { Text, StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Modal, PermissionsAndroid, Pressable, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
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
      isModalVisible1: false,
      isModalGenderVisible: false,
      gender: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
   requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  uploadImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res.didCancel) {
        console.log("user cacelled image picker");
      }
      else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      else {
        console.log("Gallery Allowed")
        let source = res;
        //console.log()
        this.setState({
          resourcePath: source?.assets[0]?.uri,
          isModalVisible1: false
        });
      }
    })
  }

  useCamera = async () => {
    launchCamera({ mediaType: 'photo' }, res => {
      // Alert.alert(JSON.stringify(res))
      if (res.didCancel) {
        console.log("user cacelled camera");
      }
      else if (res.error) { 
        console.log('Camera Error: ', res.error);
      }
      else {
        console.log("Camera Allowed")
        let source = res;
        console.log()
        this.setState({
          resourcePath: source?.assets?.[0]?.uri,
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

  onGenderChange(data) {
    this.setState({
      gender: data,
      isModalGenderVisible: false,
    })
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
  toggleModalGender = () => {
    this.setState({ isModalGenderVisible: !this.state.isModalGenderVisible });
  };
  rightCompGender = () => {
    return (
      <TouchableOpacity onPress={this.toggleModalGender}  >
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
        <ScrollView>
          <View>
            <Text style={styles.head}>
              {StringAcc.head}
            </Text>
          </View>

          <View style={styles.profPhoto}>
            {
              this.state?.resourcePath ?
                <Image
                  // source={Icons.profilePhoto}
                  source={{ uri: `${this.state.resourcePath}` }}
                  style={styles.img}
                /> :
                <Image
                  // source={Icons.profilePhoto}
                  source={Icons.profilePhoto}
                  style={styles.img}
                />
            }

            <View style={styles.profileText}>
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
          {/* <TouchableWithoutFeedback style={{backgroundColor:'red',zIndex:1,top:90,}}>
              <Text>
                asdas
              </Text>
          </TouchableWithoutFeedback> */}


          <TextinputOutlined
            text={"Gender"}
            rightComp={this.rightCompGender}
            value={this.state.gender}
            onFocus={this.toggleModalGender}


          />
          <TextinputOutlined
            text={"Phone Number"}


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
            <Pressable onPress={this.toggleModal} style={{ alignItems: 'center', justifyContent: 'center' }}>


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
            </Pressable>
          </Modal>
          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.isModalGenderVisible}
          // onRequestClose={this.toggleModal}

          >
            <Pressable onPress={this.toggleModalGender} style={styles.modalPressableGender}>


              <View style={styles.modalGenderContainer}>
                <View style={styles.modalGender} >
                  <TouchableOpacity onPress={() => { this.onGenderChange('Male') }} style={styles.genderTouchable}>
                    <Text style={styles.genderText}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.genderTouchable} onPress={() => { this.onGenderChange('Female') }}>
                    <Text style={styles.genderText}>
                      Female
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.toggleModalGender} style={styles.modalButton}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>

          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.isModalVisible1}
          //onRequestClose={}
          >
            <Pressable onPress={this.toggleModal1} style={styles.modal1press} >

              <View style={styles.modalUploadContent}>
                <View>
                  <Text style={styles.modalhead}>
                    Profile Photo
                  </Text>
                </View>

                <TouchableOpacity onPress={this.uploadImageFromGallery}>
                  <View style={styles.modalButtonTopView}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={Icons.galleryUpload} style={styles.modalIcon1} />
                      <Text style={styles.modalButtonText}>Upload From the Gallery</Text>
                    </View>

                    <Image source={Icons.arrow} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.useCamera}>
                  <View style={styles.modalButtonTopView}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={Icons.cameraUpload} style={styles.modalIcon1} />
                      <Text style={styles.modalButtonText}>Use Camera</Text>
                    </View>

                    <Image source={Icons.arrow} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.modalButtonTopView}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={Icons.avatarUpload} style={styles.modalIcon1} />
                      <Text style={styles.modalButtonText}>Select an Avatar</Text>
                    </View>

                    <Image source={Icons.arrow} />
                  </View>
                </TouchableOpacity>

              </View>




            </Pressable>




          </Modal>
        </ScrollView>
      </SafeAreaView>




    );
  }
}

const styles = StyleSheet.create({
  profileText: {
    flexDirection: 'column',
    marginTop: '20%',
    marginLeft: '4%',
  },
  modalButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  modalIcon1: {
    height: 44,
    width: 44,
  },
  modalButtonTopView: {
    backgroundColor: '#F6F9FA',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalUploadContent: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT * 0.6,
    justifyContent: 'flex-start',
    borderRadius: 15,
  },
  genderText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },
  genderTouchable: {
    padding: 15,
    backgroundColor: '#2a7bbb',
    margin: 10,
    borderRadius: 16,
    width: '80%',
  },
  modalGender: {
    width: '100%',
    alignItems: 'center',
  },
  modalPressableGender: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  modalGenderContainer: {
    height: SCREEN_HEIGHT*0.35,
    backgroundColor: 'white',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    borderRadius:24,
    padding:20,


  },
  arrow: {
    right: 60,
    top: '50%',
    height: 15,
    width: 10,
    transform: [{ rotate: '90deg' }]
  },
  modalhead: {
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 10,
    paddingTop: 40,
    marginLeft: 20,
    color: 'black',
    //borderBottomWidth: 2,
    //borderBottomColor: 'black',

  },
  modal1press: {
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    // marginBottom:0,
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
    //textAlign: 'center',
    fontSize: 16,
    paddingBottom:10,
    // backgroundColor:'blue',
  },
});

import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'

const SCREEN_WIDTH=Dimensions.get('window').width;

export default class Textinput extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const element = <TextInput.Icon name='pencil' />
    const { leftIcon, rightIcon,value, onChangeText, error, securetextentry, type, rightComp, onSubmitEditing,placeholder, leftComp } = this.props
    return (
      <View style={styles.container}>
       {/* {leftComp && leftComp()

        }
        {type == 'password' ? <TextInput
          mode='outlined'
          label={this.props.text}
          onChangeText={onChangeText}
          secureTextEntry={securetextentry}
          underlineColor='transparent'

          //placeholder={this.props.text}
          style={[styles.textin, error && styles.text]} />


          : */}

          <TextInput
            onChangeText={onChangeText}
            label={this.props.text}
            mode='outlined'
            value={value}
           // placeholder={this.props.placeholder}
            placeholder={this.props.text}
            underlineColor='transparent'
            outlineColor='#e7ebf3'
           // right={rightComp}
           // rightIcon={rightComp}
            outlineStyle={{
                borderRadius: 16
            }}
            activeOutlineColor='grey'
            style={styles.textin} />
        {rightComp && rightComp()}
        {/* <TextInput
      onChangeText={onChangeText}
      placeholder={this.props.text}
      style={[styles.textin, error && styles.text]}/> */}
        {/* {rightComp && rightComp()} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  img3: {
    height: 20,
    width: 20
  },
  textin: {
    
    borderRadius: 16,
    borderColor:'grey',
    backgroundColor: 'white',
    width: SCREEN_WIDTH*0.85,
    height: 60,
    marginHorizontal: '7%',
    // padding:'8%',
    //paddingLeft: 30,
    marginVertical: '2.5%',
    // aspectRatio:16/9,
  },
  text: {
    borderColor: 'red',
    borderWidth: 1,
  }
})


import React, { Component } from "react";
import { StyleSheet,
  Image, View, Button, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import data from "./resourceMock.json";

import { MyApp } from "./WYSIWYG";

export default class CreateNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  
    let headerRight = (
      <TouchableOpacity
        
      >
        <View style={{marginRight: 10, borderColor: '#fff', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16, color: '#fff'}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    )

    return {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
    };
  };


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <View style={Styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Button
              title="New Paragraph"
              onPress={() => {}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              title="Insert Image"
              onPress={this._pickImage}
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          style={Styles.container}
          behavior="padding"
        >
        <ScrollView>
          
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 10 }} />}
          

          <TextInput
            style={Styles.textInput}
            multiline={true}
            numberOfLines={4}
            selectTextOnFocus={false}
            onChangeText={(text) => this.setState({text})}
            value={this.state.image} />
          
          
          <MyApp />


        </ScrollView>
        </KeyboardAvoidingView>
            

      </View>

    )
  }
}

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  navbarItemStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10
  },
  textInput: {
    fontSize: 15,
    margin: 10,
    padding: 10
  },
  boldButton: {
    margin: 5,
    borderColor: '#000', 
    borderRadius: 5, 
    borderWidth: 1, 
    padding: 5,
  }
}
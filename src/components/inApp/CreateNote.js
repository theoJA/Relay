import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import NoteEditor from '../common/NoteEditor'

export default class CreateNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      title: null,
      tags: []
    }
  }

  _showModal() {
    this.setState({isModalVisible: true});
  }

  _hideModal() {
    this.setState({isModalVisible: false});
  }

  componentDidMount() {
    this.props.navigation.setParams({ showModal: this._showModal.bind(this) })
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  
    let headerRight = (
      <TouchableOpacity
      onPress={params.showModal}
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


  render() {
    return (
      <View style={Styles.container}>

        <NoteEditor/>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>
            <View style={{ borderBottomWidth: 1, borderColor: '#ddd', }}>
              <Text style={[Styles.textInputTitleStyle, {marginTop: 5, marginBottom: 10, fontSize: 18 }]}>Title and Tags</Text>
            </View>

            <Text style={Styles.textInputTitleStyle}>
              TITLE
            </Text>
            <TextInput 
            style={[Styles.textInputStyle, { fontSize: 17 }]}
            autoCapitalize={'sentences'}
            multiline={true} 
            numberOfLines={2} 
            onChangeText={(text) => this.setState({ title: text })}
            value={this.state.title}
            />

            <Text style={Styles.textInputTitleStyle}>
              TAGS
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput 
              style={[Styles.textInputStyle,{ flex: 7, fontSize: 13 }]}
              autoCapitalize={'sentences'}
              multiline={true} 
              numberOfLines={1} 
              onChangeText={(text) => this.setState({ title: text })}
              value={this.state.title}
              />
              <TouchableOpacity onPress={() => {}} style={{ flex: 4 }}>
                <Text style={[Styles.modalButton, { borderColor: '#000', borderRadius: 5, borderWidth: 1, }]}>Add Tag</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this._hideModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#EF9A9A" }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                <Text style={[Styles.modalButton, { backgroundColor: "#C5E1A5" }]}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    )
  }
}

const Styles = StyleSheet.create({
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
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
  modalButton: {
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    margin: 10
  },
  textInputTitleStyle: {
    color: "#566573",
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold'
  },
  textInputStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    padding: 5,
  },
  modalInstruct: {

  }
});
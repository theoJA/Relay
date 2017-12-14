import React, { Component } from "react";
import firebase from "firebase";
import Autocomplete from "react-native-autocomplete-input";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import NoteEditor from '../richTextEditor/NoteEditor'
import { programs, computerScience, engineering } from "../../Programs_Subjects";


const SECTIONS = [
  {
    title: programs[0].name,
    content: computerScience,
  },
  {
    title: programs[1].name,
    content: engineering,
  }
];

export default class CreateNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      title: null,
      tag: '',
      query: '',
      tagsArr: [],
      userInterests: [],
      addedInterests: [],
      profileUid: ''
    }
  }

  _showModal() {
    this.setState({isModalVisible: true});
  }

  _hideModal() {
    this.setState({isModalVisible: false});
  }

  componentWillMount() {
    let { currentUser } = firebase.auth();
    let interestArr = SECTIONS[0].content.concat(SECTIONS[1].content);
    this.props.navigation.setParams({ showModal: this._showModal.bind(this) })


    firebase.database().ref(`/users/${currentUser.uid}/profile`)
    .on('value', snapshot => {
      let profileId = Object.keys(snapshot.val())[0];
      this.setState({
        profileUid: profileId,
        userInterests: interestArr
      });
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  
    let headerRight = (
      <TouchableOpacity
      onPress={params.showModal}
      >
        <View style={{marginRight: 15 }}>
          <Text style={{fontSize: 16, backgroundColor: '#fff', borderColor: '#fff', borderRadius: 2, borderWidth: 1, padding: 5}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    )

    return {
      title: 'Create article',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
    };
  };

  _findTag(query) {
    if (query === '') {
      return [];
    }
    const { userInterests } = this.state;
    const regex = new RegExp(`${query}`);
    return userInterests.filter(interest => interest.subject.search(regex) >= 0);
  }

  _addTags() {
    let { addedInterests, query } = this.state;
    addedInterests.push(query);
    this.setState({
      addedInterests,
      query: ''
    });
  }

  _removeTags() {
    let { addedInterests } = this.that.state;
    let removeIndex = addedInterests.indexOf(this.id);
    addedInterests.splice(removeIndex, 1);
    this.that.setState({
      addedInterests
    });
  }

  render() {
    const { query, addedInterests } = this.state;
    const interests = this._findTag(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();    

    return (
      <View style={Styles.container}>

        <NoteEditor/>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>

            <Text style={[Styles.textInputTitleStyle, { marginTop: 10 }]}>
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
            <View style={{ flexDirection: 'row' }}>
              <Autocomplete 
                containerStyle={[Styles.textInputStyle,{ flex: 7 }]}
                autoCapitalize="words"
                autoCorrect={false}
                data={interests.length === 1 && comp(query, interests[0].subject) ? [] : interests}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text })}
                placeholder="Enter tag"
                renderItem={({ subject }) => (
                  <TouchableOpacity onPress={() => this.setState({ query: subject })}>
                    <Text style={{ margin: 5 }}>
                      {subject}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => {}} style={{ flex: 3 }}
                onPress={this._addTags.bind(this)}
              >
                <Text style={[Styles.modalButton, { backgroundColor: '#000', color: '#fff', borderWidth: 1, paddingTop: -2, paddingBottom: -2, paddingLeft: -2, paddingRight: -2, fontSize: 20 }]}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>   
              {(
                addedInterests.map(interest => {
                  return (
                    <TouchableOpacity
                      style={{}}
                      key={interest}
                      id={interest}
                      that={this}
                      onPress={this._removeTags}
                    >
                      <Text style={{ padding: 2, margin: 1, fontSize: 11, borderWidth: 1, borderRadius: 2 }}>{interest + ' -'}</Text>
                    </TouchableOpacity>
                  )
                })
              )
              }
            </View>
            

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this._hideModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#000', color: '#fff' }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                <Text style={[Styles.modalButton, { backgroundColor: "#9CCC65", borderColor: "#9CCC65", color: '#fff' }]}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    )
  }
}

/*
<Autocomplete 
              style={[Styles.textInputStyle,{ flex: 7, fontSize: 13 }]}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true} 
              numberOfLines={1} 
              data={interests.length === 1 && comp(query, interests[0].subject) ? [] : interests}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text })}
              placeholder="Enter tag"
              renderItem={({ subject }) => (
                <TouchableOpacity onPress={() => this.setState({ query: subject })}>
                  <Text>
                    {subject}
                  </Text>
                </TouchableOpacity>
              )}
              />
*/

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
    borderRadius: 2,
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: 'center',
    margin: 10,
    borderWidth: 1,
    fontWeight: 'bold',
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
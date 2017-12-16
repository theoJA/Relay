import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, TouchableOpacity, StyleSheet, 
  Image, ToastAndroid, TextInput } from "react-native";
  import Modal from 'react-native-modal';
import { DrawerItems, NavigationActions } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
//import { ImagePicker } from 'expo';
import { takePhoto43Ratio, pickImage43Ratio } from "../imageHandler/ImageUploader";

export default class DrawerContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        interests: [],
        username: '',
        profilePic: null
      },
      profileUid: null,
      isProfPicModalVisible: false,
      isUsernameModalVisible: false,
      tempUsername: ''
    }
  }

  logoutResetNavStack = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'Logout'}),
    ]
  });

  showProfPicModal() {
    this.setState({
      isProfPicModalVisible: true
    });
  }
  hideProfPicModal() {
    this.setState({
      isProfPicModalVisible: false
    });
  }

  showUsernameModal() {
    this.setState({
      isUsernameModalVisible: true
    })
  }
  hideUsernameModal() {
    this.setState({
      tempUsername: '',
      isUsernameModalVisible: false
    })
  }

  componentWillMount() {
    let { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/profile`)
    .on('value', snapshot => {
      let profileId = Object.keys(snapshot.val())[0];
      this.setState({
        profile: {
          interests: snapshot.val()[profileId].interests,
          username: snapshot.val()[profileId].username,
          profilePic: snapshot.val()[profileId].profilePic
        },
        profileUid: profileId
      });
    });
  }

  logoutFromRelay() {
    firebase.auth().signOut();
    ToastAndroid.show('Logged out', ToastAndroid.LONG);
    this.props.navigation.dispatch(this.logoutResetNavStack);
  }

  async setProfPicCamera() {
    let { interests, username, profilePic } = this.state.profile;
    await takePhoto43Ratio(imagelocation => {
      this.setState({
        profile: {
          interests,
          username,
          profilePic: imagelocation
        }
      }, () => this.setProfPicInFirebase());
    });
    
  }

  async setProfPicGallery() {
    let { interests, username, profilePic } = this.state.profile;
    await pickImage43Ratio(imagelocation => {
      this.setState({
        profile: {
          interests,
          username,
          profilePic: imagelocation
        }
      }, () => this.setProfPicInFirebase());
    });
  }

  setProfPicInFirebase() {
    let { profileUid, profile } = this.state;
    let { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/profile/${profileUid}`)
      .update({ profilePic: profile.profilePic })
      .then(() => {
        ToastAndroid.show('Profile picture changed', ToastAndroid.LONG);
      });
  }

  renderProfPic() {
    const { interests, username, profilePic } = this.state.profile;
    if (profilePic === "null") {
      return (
        <Ionicons style={{ borderRadius: 8, margin: 10 }} 
        name="md-person" size={120} color="black" />
      )
    } else {
      return (
        <Image 
        source={{ uri: profilePic }} 
        style={{ width: 120, height: 120, borderRadius: 8, margin: 10 }}/>
      )
    }
  }

  setNewUsername() {
    let { tempUsername, profileUid } = this.state;
    let { currentUser } = firebase.auth();
    
    firebase.database().ref(`/users/${currentUser.uid}/profile/${profileUid}`)
      .update({ username: tempUsername })
      .then(() => {
        ToastAndroid.show('Username changed', ToastAndroid.LONG);
        this.setState({
          isUsernameModalVisible: false
        });
      });
  }

  render() {
    const { interests, username, profilePic } = this.state.profile;
    return <View style={Styles.container}>
        <View style={Styles.userIconContainer}>
          <TouchableOpacity
            onPress={this.showProfPicModal.bind(this)}
          > 
          { this.renderProfPic() }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.showUsernameModal.bind(this)}
          >
            <Text>{username}</Text>
          </TouchableOpacity>
        </View>

        <DrawerItems {...this.props} />

        <View style={Styles.logOutContainer}>
          <TouchableOpacity
            onPress={this.logoutFromRelay.bind(this)}
          >
            <Text style={Styles.logOutStyle}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.footerContainer}>
        </View>

        <Modal isVisible={this.state.isProfPicModalVisible}>
          <View style={Styles.modalContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold',}}>Set profile picture</Text>
            <View style={{ borderTopWidth: 1, borderColor: '#ddd', marginTop: 10, flexDirection: 'row'}}>

              <View style={{ margin: 5, padding: 25 }}>
                <TouchableOpacity style={{alignItems: 'center'}}
                  onPress={this.setProfPicCamera.bind(this)}
                >
                  <Ionicons name="md-camera" size={52} color="black" />
                  <Text>Camera</Text>
                </TouchableOpacity>
              </View>

              <View style={{ margin: 5, padding: 25 }}>
                <TouchableOpacity style={{alignItems: 'center'}}
                  onPress={this.setProfPicGallery.bind(this)}
                >
                  <Ionicons name="md-folder" size={52} color="black" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
              </View>

            </View>
            <TouchableOpacity onPress={this.hideProfPicModal.bind(this)}>
              <Text style={Styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isVisible={this.state.isUsernameModalVisible}>
          <View style={Styles.usernameModalContainer}>
            
            <Text style={[Styles.textInputTitleStyle, { marginTop: 10, paddingBottom: 10 }]}>
              Set username
            </Text>
            <TextInput 
            style={Styles.textInputStyle}
            autoCapitalize={'sentences'}
            multiline={true} 
            numberOfLines={2} 
            onChangeText={(text) => this.setState({ tempUsername: text })}
            value={this.state.tempUsername}
            />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this.hideUsernameModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#000', color: '#fff' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.setNewUsername.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#9CCC65", borderColor: "#9CCC65", color: '#fff' }]}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>;
  }; 
}

/*  This is the logo and footer in case I might need it
<View style={Styles.footerContainer}>
          <View style={Styles.logoStyle}>
            <Image style={Styles.appLogo} source={require("../../images/latest-logo.png")} />
          </View>
          <View style={Styles.footerWordsContainer}>
            <Text>ToGoNotes</Text>
          </View>
        </View>
*/

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userIconContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 5
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    padding: 50,
    flexDirection: 'row'
  },
  appLogo: {
    height: 24,
    width: 24
  },
  logoStyle: {
    justifyContent: 'center'
  },
  footerWordsContainer: {
    padding: 5,
    justifyContent: 'center'
  },
  logOutContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    padding: 18
  },
  logOutStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 30,
    borderRadius: 5,
    alignItems: 'center'
  },
  usernameModalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
  modalClose: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    fontWeight: 'bold',
    borderWidth: 2,
    textAlign: 'center',
  },
  textInputTitleStyle: {
    color: "#566573",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  textInputStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    padding: 5,
  },
  modalButton: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
});
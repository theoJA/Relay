import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, TouchableHighlight, Button } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import grabUserProfile from '../../actions/InAppActions';

class Home extends Component {

  componentWillMount() {
    this.props.grabUserProfile();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerLeft = (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Ionicons style={Styles.iconStyle} name="md-menu" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  
    let headerRight = (
      <View style={Styles.navbarItemStyle}>
        <TouchableOpacity
          onPress={() => {navigation.navigate('CreateNote')}}
        >
          <Ionicons style={Styles.iconStyle} name="ios-add-circle" size={32} color="white" />
        </TouchableOpacity>
          
        <TouchableOpacity>
          <Ionicons style={Styles.iconStyle} name="ios-funnel" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons style={Styles.iconStyle} name="md-search" size={32} color="white" />
        </TouchableOpacity>
      </View> 
    );

    return {
      title: 'Home',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
      headerLeft,
    };
  };

  render() {
    return ( 
      <View style={Styles.container}>
        {this.props.interests && 
          this.props.interests.map((interest,index) => {
            return (
              <Text key={"interest"+index} >{interest}</Text>
            )
          })
        }
      </View>
    );
  };
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
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
    borderRadius: 5,
    alignItems: 'center'
  },
  modalClose: {
    borderColor: '#000', 
    borderRadius: 5, 
    borderWidth: 1, 
    padding: 5,
    textAlign: 'center',
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.inApp.interests,
    username: state.inApp.username
  };
}

export default connect(mapStateToProps, {grabUserProfile})(Home);

/*
<Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._hideModal.bind(this)}>
              <Text style={Styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
*/
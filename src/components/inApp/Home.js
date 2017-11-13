import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, Button } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
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
        <Text>A list of notes</Text>
        
        <Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._hideModal.bind(this)}>
              <Text style={Styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        
        
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
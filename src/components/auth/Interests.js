import React, { Component } from 'react';
import { 
  View, 
  Text,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { programs, computerScience } from '../../Programs_Subjects'
import RenderSectionList from "../common/RenderSectionList";

export default class GetStarted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interests: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity
        onPress={() => {navigation.navigate('Register', { interests: params.interests})}}
      >
        <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    )
    return {
      title: 'Interests',
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ interests: this.state.interests });
  }

  addInterests = (interest) => {
    let { interests } = this.state;
    interests = [...this.state.interests, interest];
    this.props.navigation.setParams({ interests });
    this.setState({
      interests
    });
  }

  removeInterests = (interest) => {
    let { interests } = this.state;
    let interestIndex = interests.indexOf(interest);
    interests.splice(interestIndex, 1);
    this.props.navigation.setParams({ interests });
    this.setState({
      interests
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.TextStyle}>
          Select a program and add at least 
          <Text style={{fontWeight: 'bold'}}> one </Text>field of interest:
        </Text>
        <ScrollView>
          <RenderSectionList 
            addInterests={this.addInterests}
            removeInterests={this.removeInterests}
          />
        </ScrollView>
      </View>
    );
  };
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  },
  TextStyle: {
    textAlign: 'center', 
    fontSize: 14,
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 10,
    paddingBottom: 10
  }
}
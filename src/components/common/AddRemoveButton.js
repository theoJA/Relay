import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class AddRemoveButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      buttonSymbol: '+',
      buttonColor: '#9CCC65'
    };
  }

  async changeButtonColor() {
    if (!this.state.isAdded) {
      this.props.addInterests(this.props.id);
      this.setState({ isAdded: true, buttonSymbol: '-', buttonColor: '#E74C3C' });
    }
    else {
      this.props.removeInterests(this.props.id);
      this.setState({ isAdded: false, buttonSymbol: '+', buttonColor: '#9CCC65' });
    }
  }



  render() {
    return (
      <TouchableOpacity 
      style={Styles.moveButtonToRight}
      onPress={this.changeButtonColor.bind(this)}
      >
        <View style={[Styles.addOrRemButtonStyle, {backgroundColor: this.state.buttonColor}]}>
          <Text style={Styles.addOrRemTextStyle}>
            {this.state.buttonSymbol}
          </Text>
        </View>
      </TouchableOpacity> 
    )
  }

}

const Styles = {
  addOrRemTextStyle: {
    color: '#000',
    fontWeight: 'bold'
  },
  addOrRemButtonStyle: {
    alignItems: 'center',
    marginRight: 10, 
    borderRadius: 10,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    paddingTop: 2,
  },
  moveButtonToRight: {
    flex: 1
  }
}
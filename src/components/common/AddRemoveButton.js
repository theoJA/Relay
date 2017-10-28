import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export class AddRemoveButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      buttonSymbol: '+',
      buttonColor: '#9CCC65'
    };
  }

  changeButtonColor() {
    if (!this.state.isAdded) {
      this.setState({ isAdded: true, buttonSymbol: '-', buttonColor: '#E74C3C' })
      alert(this.props.id)
    }
    else {
      this.setState({ isAdded: false, buttonSymbol: '+', buttonColor: '#9CCC65' })
      alert(this.props.id)
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
    color: '#000'
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
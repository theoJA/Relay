import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OauthButton = props => {
  const { name, size, color, buttonColor, buttonTitle } = props

  return (
    <View style={[Styles.buttonStyle, {backgroundColor: buttonColor}]}>
      <Ionicons style={Styles.logoStyle} name={name} size={size} color={color} />
      <Text style={Styles.buttonTitleStyle}>{buttonTitle}</Text>
    </View>
  )
}

export {OauthButton}

const Styles = {
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 5
  },
  logoStyle: {
    flex: 1,
    borderRightWidth: 1,
    marginLeft: 10
  },
  buttonTitleStyle: {
    flex: 3,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#fff'
  }
}
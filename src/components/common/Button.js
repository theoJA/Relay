import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => {
  return (
    // one of the 4 button feedback from react native doc
    <TouchableOpacity 
      onPress={props.onPress} 
      style={styles.buttonStyle}>
        <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity> 
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  }
}

export {Button};
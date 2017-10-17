import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = (props) => {
  return (
    // one of the 4 button feedback from react native doc
    <TouchableOpacity 
      onPress={props.onPress} 
      style={styles.buttonStyle}>
        <Text style={styles.textStyle}>{props.children}</Text>
    </TouchableOpacity> 
  )
} 

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch', //position the item itself to flexbox rules, as opposed to aligning stuff inside it
    backgroundColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  }
}

export {Button}
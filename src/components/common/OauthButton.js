import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OauthButton = props => {
  const { name, size, color } = props

  return (
    <Ionicons name={name} size={size} color={color} />
  )
}

export {OauthButton}
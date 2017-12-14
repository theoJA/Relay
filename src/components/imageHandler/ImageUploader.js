import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';


takePhoto43Ratio = async (cb) => {
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  handleSelectedImage(pickerResult,cb);
};

takePhotoNoRatio = async (cb) => {
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
  });
  handleSelectedImage(pickerResult,cb);
};

pickImage43Ratio = async (cb) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  handleSelectedImage(pickerResult,cb);
};

pickImageNoRatio = async (cb) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
  });
  handleSelectedImage(pickerResult,cb);
};

// --------------------------------------------------------------------

handleSelectedImage = async (pickerResult,cb) => {
  let uploadResponse, uploadResult;

  try {
    if (!pickerResult.cancelled) {
      uploadResponse = await uploadImageAsync(pickerResult.uri);
      uploadResult = await uploadResponse.json();
      //this.setState({ image: uploadResult.location });
      //console.log(uploadResult);
      //console.log(typeof(uploadResult.location), uploadResult.location);
      //return uploadResult.location;
      cb(uploadResult.location);
    }
  } catch (e) {
    console.log({ uploadResponse });
    console.log({ uploadResult });
    console.log({ e });
    ToastAndroid.show('Upload failed', ToastAndroid.LONG);
  }
};

// --------------------------------------------------------------------

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-mljodgekvo.now.sh/upload';

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}

export {
  takePhoto43Ratio,
  takePhotoNoRatio,
  pickImage43Ratio,
  pickImageNoRatio,
  uploadImageAsync
};
import React, { Component } from "react";
import firebase from 'firebase';
import { 
  StyleSheet, Image, View, Button, Text, TouchableOpacity, 
  TextInput, ScrollView, Dimensions, ToastAndroid } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons, Entypo, MaterialCommunityIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

export default class ViewNote extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        tagsArr: []
      }
    }

    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
  
      return {
        headerStyle: { backgroundColor: '#fff', marginTop: Expo.Constants.statusBarHeight },
        headerTitleStyle: { color: 'white'}
      };
    };

    componentWillMount() {
      this._dataRenderer(this.props.navigation.state.params.articleObj.articleData);
    }

    _dataRenderer(editorStateObj) {
      let { tagsArr } = this.state;
  
      tagsArr.length = 0;
      editorStateObj.typeArr.map((type,index) => {
        
        switch (type) {
          case "text": {
            tagsArr.push(
              <TouchableOpacity 
                key={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
                id={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
                that={this}
                onPress={this._setSelectedParag}
              >
                <Text style={editorStateObj.styleArr[index]}>
                  {`${editorStateObj.dataArr[index]}\n\n`}
                </Text>
              </TouchableOpacity>
            );
            break;
          }
          
          case "image": {
            tagsArr.push(
              <TouchableOpacity 
              key={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
              id={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
              that={this}
              onPress={this._setSelectedParag}
              resizeMode="stretch"
              >
                <Image
                  source={{ uri: editorStateObj.dataArr[index] }}
                  style={[{ width: Dimensions.get("window").width, height: (Dimensions.get("window").width/16)*11, marginTop: 10, marginBottom: 10, alignSelf: 'center' }, editorStateObj.styleArr[index]]}
                />
              </TouchableOpacity>
              );
              break;
            }
            
          case "link": {
            tagsArr.push(
              <TouchableOpacity 
              key={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
              id={`${type}/split/${editorStateObj.dataArr[index]}/split/${index}`}
              that={this}
              onPress={this._setSelectedParag}
              >
                <Text style={editorStateObj.styleArr[index]}>
                  {`${editorStateObj.dataArr[index]}\n\n`}
                </Text>
              </TouchableOpacity>
            );
            break;
          }
        }
      });  
        
      // pass the editorState to CreateNote
      
  
      let tempTagsArr = tagsArr
      this.setState({ tagsArr: tempTagsArr });
    };


    render() {
      const { tagsArr } =this.state;
      const { articleData, createdDate, title } = this.props.navigation.state.params.articleObj;
      return (
        <ScrollView style={Styles.scrollingContainer}>
          <View> 
            <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 20, marginLeft: 10, marginRight: 10, marginTop: 20 }}>
              {title}
            </Text>
          </View>
          {tagsArr && (
          <View>
            {
              tagsArr.map(tags => {
                return (
                  tags
                )
              })
            }
          </View>
          )}
      </ScrollView>
      )
    }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10
  },
  textInput: {
    fontSize: 15,
    margin: 5,
    padding: 10
  },
  editorButtonsContainer: {
    flexDirection: "row", 
    justifyContent: "center"
  },
  editorButtons: {
    margin: 5,
    borderColor: '#000', 
    borderRadius: 3, 
    borderWidth: 1, 
    padding: 8,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
  imageModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 30,
    borderRadius: 5,
    alignItems: 'center'
  },
  modalButton: {
    borderRadius: 2,
    borderWidth: 1,
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  modalClose: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    fontWeight: 'bold',
    borderWidth: 1,
    textAlign: 'center',
  },
  textInputTitleStyle: {
    color: "#566573",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  textInputStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    padding: 5,
  },

});
import React, { Component } from "react";
import { 
  StyleSheet, Image, View, Button, Text, TouchableOpacity, 
  TextInput, ScrollView } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons, Entypo, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';


const colors = {
  inactive: '#ECEFF1',
  active: '#AEB6BF'
};

const textStyles = {
  normal: { fontSize: 15, fontWeight: 'normal', fontStyle: 'normal'},
  H1: { fontSize: 25, fontWeight: 'bold', fontStyle: 'normal'},
  H2: { fontSize: 20, fontWeight: 'bold', fontStyle: 'normal'},
  script: { fontSize: 15, backgroundColor: '#AED6F1', fontWeight: 'normal', fontStyle: 'normal' },
  quote: { fontSize: 17, fontStyle: 'italic', fontWeight: 'normal', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 },
  link: { fontSize: 17, textDecorationLine: 'underline' },
};

const initialButtonStates = {
  H1: {active: false, backgroundColor: colors.inactive},
  H2: {active: false, backgroundColor: colors.inactive},
  script: {active: false, backgroundColor: colors.inactive},
  quote: {active: false, backgroundColor: colors.inactive},
};

export default class NoteEditor extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      buttonStates: initialButtonStates,
      activeTextStyle: 'normal',
      data: null,
      linkInputValue: null,
      textInputValue: null,
      editorState: {
        typeArr: [],
        dataArr: [],
        styleArr: [],
      },
      tagsArr: []
    }
  }

  _showModal() {
    this.setState({isModalVisible: true});
  }

  _hideModal() {
    this.setState({isModalVisible: false});
  }

  _insertImage = async () => {
    let { data, editorState } = this.state; 
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {

      editorState.typeArr.push('image');
      let tempTypeArr = editorState.typeArr;
      
      editorState.dataArr.push(result.uri);
      let tempDataArr = editorState.dataArr;

      editorState.styleArr.push({});
      let tempStyleArr = editorState.styleArr;

      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        data: null,
      });
    }
    this._dataRenderer(editorState);
  };

  _insertText() {
    let { data, editorState, textInputValue, buttonStates, activeTextStyle } = this.state; 
    
    if (!data) {
      return;
    }

    else {
      editorState.typeArr.push('text');
      let tempTypeArr = editorState.typeArr;
      
      editorState.dataArr.push(data);
      let tempDataArr = editorState.dataArr;
  
      editorState.styleArr.push(textStyles[activeTextStyle]);
      let tempStyleArr = editorState.styleArr;
  
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        textInputValue: null,
        data: null,
      })
  
      this._dataRenderer(editorState);
    }

  }

  _insertLink() {
    let { linkInputValue, editorState, textInputValue } = this.state; 
    
    if (!linkInputValue) {
      return;
    }

    else {
      editorState.typeArr.push('link');
      let tempTypeArr = editorState.typeArr;
      
      editorState.dataArr.push(linkInputValue);
      let tempDataArr = editorState.dataArr;

      editorState.styleArr.push(textStyles.link);
      let tempStyleArr = editorState.styleArr;
  
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        linkInputValue: null
      })
  
      this._dataRenderer(editorState);
    }
  }

  _displayKey() {
    //alert(this.id.split(',')[0]);
    alert(this.id);
  }

  _dataRenderer(editorStateObj) {
    let { tagsArr } = this.state;

    tagsArr.length = 0;
    editorStateObj.typeArr.map((type,index) => {
      
      switch (type) {
        case "text": {
          tagsArr.push(
            <TouchableOpacity 
              key={`${type},${editorStateObj.dataArr[index]},${index}`}
              id={`${type},${editorStateObj.dataArr[index]},${index}`}
              onPress={this._displayKey}
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
              key={`${type},${editorStateObj.dataArr[index]},${index}`}
              id={`${type},${editorStateObj.dataArr[index]},${index}`}
              onPress={this._displayKey}
            >
              <Image
                source={{ uri: editorStateObj.dataArr[index] }}
                style={[{ width: 300, height: 250, margin: 10 }, editorStateObj.styleArr[index]]}
              />
            </TouchableOpacity>
            );
            break;
          }
          
        case "link": {
          tagsArr.push(
            <TouchableOpacity 
              key={`${type},${editorStateObj.dataArr[index]},${index}`}
              id={`${type},${editorStateObj.dataArr[index]},${index}`}
              onPress={this._displayKey}
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
      
    let tempTagsArr = tagsArr

    this.setState({ tagsArr: tempTagsArr });
  }

  _styleOutput() {
    let { H1, H2, script, quote, link } = this.state.buttonStates;
    if (H1.active) {return textStyles.H1;}
    if (H2.active) {return textStyles.H2;}
    if (script.active) {return textStyles.script;}
    if (quote.active) {return textStyles.quote;}
    else return textStyles.normal;
  }

  _changeButtonColor(id) {
    let { buttonStates, activeTextStyle } = this.state;
    if(buttonStates[id].active) {
      buttonStates[id].active = false;
      buttonStates[id].backgroundColor = colors.inactive;
      this.setState({activeTextStyle: 'normal'})
    } else {
      buttonStates.H1.active = false;
      buttonStates.H2.active = false;
      buttonStates.script.active = false;
      buttonStates.quote.active = false;
      buttonStates.H1.backgroundColor = colors.inactive;
      buttonStates.H2.backgroundColor = colors.inactive;
      buttonStates.script.backgroundColor = colors.inactive;
      buttonStates.quote.backgroundColor = colors.inactive;

      buttonStates[id].active = true;
      buttonStates[id].backgroundColor = colors.active;
      this.setState({activeTextStyle: id})
    }
    this.forceUpdate();
  }

  render() {
    let { editorState, data, textInputValue, tagsArr, buttonStates } = this.state;
    return (
    
      <View style={Styles.container}>
        <TextInput 
        style={[Styles.textInput, this._styleOutput()]} 
        autoCapitalize={'sentences'}
        multiline={true} 
        numberOfLines={5} 
        selectTextOnFocus={false} 
        onChangeText={text => {
            this.setState({ data: text, textInputValue: text })
          }
        } 
        value={textInputValue} />

        <View style={Styles.editorButtonsContainer}>
          <TouchableOpacity onPress={() => {
            this._changeButtonColor('H1');
          }}>
            <MaterialCommunityIcons style={[Styles.editorButtons, {backgroundColor: `${buttonStates.H1.backgroundColor}`}]} name="format-header-1" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this._changeButtonColor('H2');
          }}>
            <MaterialCommunityIcons style={[Styles.editorButtons, {backgroundColor: `${buttonStates.H2.backgroundColor}`}]} name="format-header-2" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this._changeButtonColor('script');
          }}>
            <Entypo style={[Styles.editorButtons, {backgroundColor: `${buttonStates.script.backgroundColor}`}]} name="code" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this._changeButtonColor('quote');
          }}>
            <Entypo style={[Styles.editorButtons, {backgroundColor: `${buttonStates.quote.backgroundColor}`}]} name="quote" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={Styles.editorButtonsContainer}>
          <TouchableOpacity onPress={this._insertText.bind(this)}>
            <Text style={Styles.editorButtons}>+ Text</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._insertImage}>
            <Text style={Styles.editorButtons}>+ Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showModal.bind(this)}>
            <Text style={Styles.editorButtons}>+ Link</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={Styles.scrollingContainer}>

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

        <Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>
            
            <Text style={Styles.textInputTitleStyle}>
              Add a link
            </Text>
            <TextInput 
            style={Styles.textInputStyle}
            autoCapitalize={'sentences'}
            multiline={true} 
            numberOfLines={2} 
            onChangeText={(text) => this.setState({ linkInputValue: text })}
            value={this.state.linkInputValue}
            />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this._hideModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#EF9A9A" }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._insertLink.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#C5E1A5" }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  scrollingContainer: {
    flex: 1,
    backgroundColor: '#ECEFF1',
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
    borderRadius: 5, 
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
  modalButton: {
    borderRadius: 5,
    borderWidth: 1, 
    padding: 8,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
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
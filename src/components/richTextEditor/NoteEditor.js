import React, { Component } from "react";
import { 
  StyleSheet, Image, View, Button, Text, TouchableOpacity, 
  TextInput, ScrollView, Dimensions } from "react-native";
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

const selectedParagStyles = {
  selected: { borderColor: '#CDDC39', borderWidth: 3, borderRadius: 5 },
  notSelected: { borderWidth: 0 },
}

export default class NoteEditor extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      linkModalVisible: false,
      editModalVisible: false,
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
      tagsArr: [],
      selectedParag: {
        type: null,
        index: null,
      },
      editingStatus: {
        editing: false,
        editingInstructions: "",
      } 
    };
  };

// --- Modal functions ---

  _showLinkModal() {
    this.setState({linkModalVisible: true});
  };
  _hideLinkModal() {
     
    this.setState({linkModalVisible: false});
  };

  _showEditModal() {
    this.setState({editModalVisible: true});
  };
  _hideEditModal() {
    this.setState({editModalVisible: false});
  };

// --------------------------

// --- Data Insertion functions ---

  _insertImage = async () => {
    let { data, editorState, selectedParag, editingStatus } = this.state; 
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      //aspect: [16, 11],
    });
    if (!result.cancelled) {


      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'image';
        editorState.dataArr[selectedParag.index] = result.uri;
        editorState.styleArr[selectedParag.index] = {};
      }

      else {
        editorState.typeArr.push('image');
        editorState.dataArr.push(result.uri);
        editorState.styleArr.push({});
      }
      
      let tempTypeArr = editorState.typeArr;
      let tempDataArr = editorState.dataArr;
      let tempStyleArr = editorState.styleArr;

      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        textInputValue: null,
        data: null,
        editingStatus: {
          editing: false,
          editingInstructions: "",
        },
      });
    }
    this._dataRenderer(editorState);
  };

  _insertText() {
    let { data, editorState, textInputValue, buttonStates, activeTextStyle, editingStatus, selectedParag } = this.state; 

    if (!data) {
      return;
    }

    else {

      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'text';
        editorState.dataArr[selectedParag.index] = data;
        editorState.styleArr[selectedParag.index] = textStyles[activeTextStyle];
      }
      else {
        editorState.typeArr.push('text');
        editorState.dataArr.push(data);
        editorState.styleArr.push(textStyles[activeTextStyle]);
      }
      
      let tempTypeArr = editorState.typeArr;
      let tempDataArr = editorState.dataArr;
      let tempStyleArr = editorState.styleArr;
  
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        textInputValue: null,
        data: null,
        editingStatus: {
          editing: false,
          editingInstructions: "",
        },
      })
  
      this._dataRenderer(editorState);
    }

  }

  _insertLink() {
    let { data, linkInputValue, editorState, textInputValue, selectedParag, editingStatus } = this.state; 
    if (!linkInputValue) {
      return;
    }

    else {

      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'link';
        editorState.dataArr[selectedParag.index] = linkInputValue;
        editorState.styleArr[selectedParag.index] = textStyles.link;
      } else {
        editorState.typeArr.push('link');
        editorState.dataArr.push(linkInputValue);
        editorState.styleArr.push(textStyles.link);
      }

      let tempTypeArr = editorState.typeArr;
      let tempDataArr = editorState.dataArr;
      let tempStyleArr = editorState.styleArr;
      
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
          styleArr: tempStyleArr,
        },
        data: null,
        linkInputValue: null,
        textInputValue: null,
        editingStatus: {
          editing: false,
          editingInstructions: "",
        },
      })
  
      this._dataRenderer(editorState);
    }
  }

// --------------------------------

// ---- Editing paragraph functions ----
  _setSelectedParag() {
    this.that._showEditModal();
    this.that.setState({
      selectedParag: {
        type: this.id.split('/split/')[0],
        index: this.id.split('/split/')[2],
      }
    });
  }

  _startEditing() {
    let { data, textInputValue, editorState, selectedParag } = this.state;
    let tempTextInputValue = '';

    if (selectedParag.type === 'text') {
      tempTextInputValue = editorState.dataArr[selectedParag.index];
    }
    this._hideEditModal();
    this.setState({
      editingStatus: {
        editing: true,
        editingInstructions: `Editing paragraph ${parseInt(selectedParag.index) + 1}. Insert text, image, or link.`
      },
      textInputValue: tempTextInputValue,
      data: tempTextInputValue,
    });
  }
// ---------------------------------------


// --- Data Renderer ---
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
      
    let tempTagsArr = tagsArr

    this.setState({ tagsArr: tempTagsArr });
  };

// --- Text Style functions ---
  _styleOutput() {
    let { H1, H2, script, quote, link } = this.state.buttonStates;
    if (H1.active) {return textStyles.H1;}
    if (H2.active) {return textStyles.H2;}
    if (script.active) {return textStyles.script;}
    if (quote.active) {return textStyles.quote;}
    else return textStyles.normal;
  };

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
  };

// ---------------------------

// ---- helper functions -----
  _editingInstructions() {
    return (
      <Text>
        {this.state.editingStatus.editingInstructions}
      </Text>
    )
  }
// -----------------------

  render() {
    let { editorState, data, textInputValue, tagsArr, buttonStates, editingStatus } = this.state;
    return (
    
      <View style={Styles.container}>

        {this._editingInstructions()}

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
          <TouchableOpacity onPress={this._showLinkModal.bind(this)}>
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

        <Modal isVisible={this.state.linkModalVisible}>
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
              <TouchableOpacity onPress={this._hideLinkModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#AED6F1' }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._insertLink.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#C5E1A5" }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.editModalVisible}>
          <View style={Styles.modalContainer}>
            
            <Text style={Styles.textInputTitleStyle}>
              {this.state.selectedParag.index}
            </Text>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={this._hideEditModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#AED6F1" }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._startEditing.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#C5E1A5" }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._insertLink.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#EF9A9A" }]}>Delete</Text>
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
    margin: 10,
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
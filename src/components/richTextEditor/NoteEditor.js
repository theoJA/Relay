import React, { Component } from "react";
import { 
  StyleSheet, Image, View, Button, Text, TouchableOpacity, 
  TextInput, ScrollView, Dimensions, ToastAndroid } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons, Entypo, MaterialCommunityIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { ImagePicker } from 'expo';


const colors = {
  inactive: '#fff',
  active: '#C5E1A5'
};

const textStyles = {
  normal: { fontSize: 15, fontWeight: 'normal', fontStyle: 'normal'},
  H1: { fontSize: 25, fontWeight: 'bold', fontStyle: 'normal'},
  H2: { fontSize: 20, fontWeight: 'bold', fontStyle: 'normal'},
  script: { fontSize: 15, backgroundColor: '#D5D8DC', fontWeight: 'normal', fontStyle: 'normal', padding: 15 },
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
      imageModalVisible: false,
      imageFrom: 'gallery',
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
      },
      insertBetween: {
        inserting: false,
        insertingInstructions: "",
        index: null 
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

  _showImageModal() {
    this.setState({
      imageModalVisible: true
    });
  }
  _hideImageModal() {
    this.setState({
      imageModalVisible: false
    });
  }
// --------------------------
  

// --- Data Insertion functions ---
  
  _insertText() {
    let { data, editorState, textInputValue, buttonStates, activeTextStyle, editingStatus, selectedParag, insertBetween } = this.state; 
  
    if (!data) {
      return;
    }
  
    else {
  
      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'text';
        editorState.dataArr[selectedParag.index] = data;
        editorState.styleArr[selectedParag.index] = textStyles[activeTextStyle];
      }
      else if (insertBetween.inserting) {
        editorState.typeArr.splice(insertBetween.index, 0, 'text');
        editorState.dataArr.splice(insertBetween.index, 0, data);
        editorState.styleArr.splice(insertBetween.index, 0, textStyles[activeTextStyle]);
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
        selectedParag: {
          type: null,
          index: null,
        },
        insertBetween: {
          inserting: false,
          insertingInstructions: "",
          index: null 
        }
      })
  
      this._dataRenderer(editorState);
    }
  
  }

  _insertImage = async () => {
    let { imageFrom, data, editorState, selectedParag, editingStatus, insertBetween } = this.state; 
    let result;
    
    if (imageFrom === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
    } else if (imageFrom === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true
      });
    }

    if (!result.cancelled) {


      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'image';
        editorState.dataArr[selectedParag.index] = result.uri;
        editorState.styleArr[selectedParag.index] = {};
      }
      else if (insertBetween.inserting) {
        editorState.typeArr.splice(insertBetween.index, 0, 'image');
        editorState.dataArr.splice(insertBetween.index, 0, result.uri);
        editorState.styleArr.splice(insertBetween.index, 0, {});
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
        selectedParag: {
          type: null,
          index: null,
        },
        insertBetween: {
          inserting: false,
          insertingInstructions: "",
          index: null 
        }
      });
    }
    this._dataRenderer(editorState);
  };

  _insertLink() {
    let { data, linkInputValue, editorState, textInputValue, selectedParag, editingStatus, insertBetween } = this.state; 
    if (!linkInputValue) {
      return;
    }

    else {

      if (editingStatus.editing) {
        editorState.typeArr[selectedParag.index] = 'link';
        editorState.dataArr[selectedParag.index] = linkInputValue;
        editorState.styleArr[selectedParag.index] = textStyles.link;
      } 
      else if (insertBetween.inserting) {
        editorState.typeArr.splice(insertBetween.index, 0, 'link');
        editorState.dataArr.splice(insertBetween.index, 0, linkInputValue);
        editorState.styleArr.splice(insertBetween.index, 0, textStyles.link);
      }
      else {
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
        selectedParag: {
          type: null,
          index: null,
        },
        insertBetween: {
          inserting: false,
          insertingInstructions: "",
          index: null 
        }
      })
  
      this._dataRenderer(editorState);
    }
  }

  _insertAbove() {
    let { selectedParag } = this.state;
    let tempIndex = selectedParag.index;
    this._hideEditModal();
    this.setState({
      insertBetween: {
        inserting: true,
        insertingInstructions: 'Insert ABOVE selected paragraph',
        index: tempIndex
      }
    })
  }

  _insertBelow() {
    let { selectedParag } = this.state;
    let tempIndex = parseInt(selectedParag.index) + 1;
    this._hideEditModal();
    this.setState({
      insertBetween: {
        inserting: true,
        insertingInstructions: 'Insert BELOW selected paragraph',
        index: tempIndex
      }
    })
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
        editingInstructions: `Insert new text, image, or link.`
      },
      textInputValue: tempTextInputValue,
      data: tempTextInputValue,
    });
  }

  _cancelEditing() {
    let { data, textInputValue, linkInputValue, editorState, selectedParag } = this.state;
  
    this.setState({
      selectedParag: {
        type: null,
        index: null,
      },
      editingStatus: {
        editing: false,
        editingInstructions: ""
      },
      insertBetween: {
        inserting: false,
        insertingInstructions: "",
        index: null 
      },
      data: null,
      textInputValue: null,
      linkInputValue: null
    })
  }

  _deleteParag() {
    let { editorState, selectedParag } = this.state;
    editorState.typeArr.splice(selectedParag.index, 1);
    editorState.dataArr.splice(selectedParag.index, 1);
    editorState.styleArr.splice(selectedParag.index, 1);
    let tempTypeArr = editorState.typeArr;
    let tempDataArr = editorState.dataArr;
    let tempStyleArr = editorState.styleArr;

    this.setState({
      selectedParag: {
        type: null,
        index: null,
      },
      editorState: {
        typeArr: tempTypeArr,
        dataArr: tempDataArr,
        styleArr: tempStyleArr,
      }
    })
    this._hideEditModal();
    this._dataRenderer(editorState);
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
      
    // pass the editorState to CreateNote
    this.props.setArticleData(editorStateObj);

    let tempTagsArr = tagsArr
    this.setState({ tagsArr: tempTagsArr });
  };
// ---------------------------


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
    let { editingStatus, insertBetween } = this.state; 
    if (editingStatus.editing || insertBetween.inserting) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 7, textAlign: 'center', paddingTop: 15, backgroundColor: '#C5E1A5', fontWeight: 'bold' }}>
            {editingStatus.editing ? editingStatus.editingInstructions : insertBetween.inserting ? insertBetween.insertingInstructions : null}
          </Text>
          <TouchableOpacity 
            style={{ flex: 3, backgroundColor: '#C5E1A5' }}
            onPress={this._cancelEditing.bind(this)}
          >
            <Text
            style={[Styles.modalButton, { padding: 3, backgroundColor: "#000", fontWeight: 'bold', color: '#fff' }]}
            >
              Cancel
            </Text>            
          </TouchableOpacity>
        </View>
      )
    }
  }

  _setImageCamera() {
    this.setState({
      imageFrom: 'camera'
    }, () => {
      this._insertImage();
    })
  }

  _setImageGallery() {
    this.setState({
      imageFrom: 'gallery'
    }, () => {
      this._insertImage();
    })
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
            <Text style={Styles.editorButtons}><FontAwesome name="plus-circle" size={15} color="black" /><Entypo name="text" size={20} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showImageModal.bind(this)}>
            <Text style={Styles.editorButtons}><FontAwesome name="plus-circle" size={15} color="black" /><Entypo name="image-inverted" size={20} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showLinkModal.bind(this)}>
            <Text style={Styles.editorButtons}><FontAwesome name="plus-circle" size={15} color="black" /><Entypo name="link" size={20} color="black" /></Text>
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
            
            <Text style={[Styles.textInputTitleStyle, { marginTop: 10, paddingBottom: 10 }]}>
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
                <Text style={[Styles.modalButton, { backgroundColor: '#000', color: '#fff' }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._insertLink.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#9CCC65", borderColor: "#9CCC65", color: '#fff' }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.editModalVisible}>
          <View style={[Styles.modalContainer, { alignItems: 'center'}]}>
            
            <Text style={[Styles.textInputTitleStyle, { marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#ddd' }]}>
              {`Select an option`}
            </Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity onPress={this._insertAbove.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#fff' }]}>Insert 
                  <Entypo style={[Styles.editorButtons, { backgroundColor: '#fff' }]} name="arrow-up" size={20} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._insertBelow.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#fff' }]}>Insert 
                  <Entypo style={[Styles.editorButtons, { backgroundColor: '#fff' }]} name="arrow-down" size={20} color="black" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginTop: -5 }}>
              <TouchableOpacity onPress={this._hideEditModal.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: '#000', color: '#fff' }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._startEditing.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#3498DB", borderColor: '#3498DB',color: '#fff' }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._deleteParag.bind(this)}>
                <Text style={[Styles.modalButton, { backgroundColor: "#E74C3C", borderColor: '#E74C3C',color: '#fff' }]}>Delete</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <Modal isVisible={this.state.imageModalVisible}>
          <View style={Styles.imageModalContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold',}}>Select an option</Text>
            <View style={{ borderTopWidth: 1, borderColor: '#ddd', marginTop: 10, flexDirection: 'row'}}>

              <View style={{ margin: 5, padding: 25 }}>
                <TouchableOpacity style={{alignItems: 'center'}}
                  onPress={this._setImageCamera.bind(this)}
                >
                  <Ionicons name="md-camera" size={52} color="black" />
                  <Text>Camera</Text>
                </TouchableOpacity>
              </View>

              <View style={{ margin: 5, padding: 25 }}>
                <TouchableOpacity style={{alignItems: 'center'}}
                  onPress={this._setImageGallery.bind(this)}
                >
                  <Ionicons name="md-folder" size={52} color="black" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
              </View>

            </View>
            <TouchableOpacity onPress={this._hideImageModal.bind(this)}>
              <Text style={Styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  };
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
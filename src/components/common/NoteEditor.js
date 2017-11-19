import React, { Component } from "react";
import { 
  StyleSheet, Image, View, Button, Text, TouchableOpacity, 
  TextInput, ScrollView, KeyboardAvoidingView, WebView } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

export default class NoteEditor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // text: '',
      // textInputValue: '',
      // image: null,
      // typeArr: [],
      // dataArr: [],
      // editorStates: [],
      // undoRedo: 1,
      // currId: 0,
      // renderedStuff: [],
      data: null,
      textInputValue: null,
      editorState: {
        typeArr: [],
        dataArr: [],
      },
      tagsArr: []
    }
  }


  _insertImage = async () => {
    let { data, editorState } = this.state; 
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });
    //console.log(result);
    if (!result.cancelled) {

      editorState.typeArr.push('image');
      let tempTypeArr = editorState.typeArr;
      
      editorState.dataArr.push(result.uri);
      let tempDataArr = editorState.dataArr;
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
        },
        data: null,
      });
      
    }
    
    this._dataRenderer(editorState);
  };

  _insertText() {
    let { data, editorState, textInputValue } = this.state; 
    //let { text, image, typeArr, dataArr, editorStates, undoRedo, currId } = this.state;
    
    if (!data) {
      return;
    }

    else {
      editorState.typeArr.push('text');
      let tempTypeArr = editorState.typeArr;
      
      editorState.dataArr.push(data);
      let tempDataArr = editorState.dataArr;
  
      // Save the style as well!
  
      this.setState({
        editorState: {
          typeArr: tempTypeArr,
          dataArr: tempDataArr,
        },
        textInputValue: null,
        data: null,
      })
  
      this._dataRenderer(editorState);
    }

    // IF undoRedo is 1, we add a new data object to the array. We use the same case when editing a paragraph or image
    // if (undoRedo === 1) {
      
    //   // Push 'text' into the typeArr
    //   typeArr.push('text');
    //   let tempTypeArr = typeArr;
      
    //   // Push the text into dataArr
    //   dataArr.push(text);
    //   let tempDataArr = dataArr;

    //   editorStates.push({
    //     editorTypeArr: [],
    //     editorDataArr: []
    //   });

    //   editorStates[editorStates.length - undoRedo].editorTypeArr.push(...typeArr);
    //   editorStates[editorStates.length - undoRedo].editorDataArr.push(...dataArr);

    //   let tempEditorStates = editorStates;

    //   this.setState({
    //     typeArr: tempTypeArr,
    //     dataArr: tempDataArr,
    //     editorStates: tempEditorStates
    //   })
    // }
    
    // ELSE if undoRedo is more than 1, we just modify the next object to the right in the array
    // else if (undoRedo > 1) {
      
    //   // insert 'text' and its data into typeArr and dataArr respectively
    //   typeArr[editorStates.length - undoRedo + 1] = 'text';
    //   dataArr[editorStates.length - undoRedo + 1] = text;
      
    //   // slice the editorStates to remove everything after the current state
    //   let tempEditorStates = editorStates.slice(0, editorStates.length - undoRedo + 1);
    //   this.setState({ editorStates: tempEditorStates });

    //   // set undoRedo to 1 since we cannot redo once we add a new state
    //   this.setState({ undoRedo: 1 });

    //   // push an empty object into editorStates
    //   editorStates.push({
    //     editorTypeArr: [],
    //     editorDataArr: []
    //   });

    //   // slice the typeArr and dataArr
    //   let tempTypeArr = typeArr.slice(0,editorStates.length - undoRedo + 1);
    //   let tempDataArr = dataArr.slice(0,editorStates.length - undoRedo + 1);

    //   this.setState({ typeArr : tempTypeArr });
    //   this.setState({ dataArr : tempDataArr });

    //   // push newly sliced typeArr and dataArr into the new object's array
    //   editorStates[editorStates.length - 1].editorTypeArr.push(typeArr);
    //   editorStates[editorStates.length - 1].editorDataArr.push(dataArr);

    //}

    // after processing the new data and types, we call the renderer with the newly added state
    //this._dataRenderer(editorStates[editorStates.length - 1]);
  }

  _displayKey() {
    
    alert(this.id.split(',')[0]);
  }

  _dataRenderer(editorStateObj) {
    
    let { data, editorStates, tagsArr } = this.state;

    // let tempTagsArr = tagsArr;
    // tempTagsArr.length = 0;
    // this.setState({tagsArr: tempTagsArr});
    
      
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
              <Text>
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
                style={{ width: 300, height: 250, margin: 10 }}
              />
            </TouchableOpacity>
            );
            break;
          }
          
        case "link": {
        }
      }
    });  
      
    let tempTagsArr = tagsArr

    this.setState({ tagsArr: tempTagsArr });
  }

  render() {
    let { editorState, data, textInputValue, tagsArr } = this.state;
    return (
    
      <View style={Styles.container}>
        <TextInput 
        style={Styles.textInput} 
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
          <TouchableOpacity>
            <MaterialCommunityIcons style={Styles.editorButtons} name="format-header-1" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons style={Styles.editorButtons} name="format-header-2" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo style={Styles.editorButtons} name="code" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo style={Styles.editorButtons} name="quote" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo style={Styles.editorButtons} name="link" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={Styles.editorButtonsContainer}>
          <TouchableOpacity
          onPress={
              this._insertText.bind(this)
          }
          >
            <Text style={Styles.editorButtons}>Insert Text</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._insertImage}>
            <Text style={Styles.editorButtons}>Insert Image</Text>
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
    fontWeight: 'bold'
  },

});
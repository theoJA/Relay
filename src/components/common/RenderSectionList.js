import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { programs, computerScience, engineering } from "../../Programs_Subjects";
import { RenderFlatList } from "./RenderFlatList";

const SECTIONS = [
  {
    title: programs[0].name,
    content: computerScience,
  },
  {
    title: programs[1].name,
    content: engineering,
  }
];

export default class RenderSectionList extends Component {
 
  _renderHeader(section) {
    return (
      <View style={Styles.headerStyle}>
        <Text style={Styles.headerTextStyle}>{section.title}</Text>
      </View>
    );
  };

  // make an external component to handle the array so that the header only has one child component
  _renderContent(section) {
    return (
      <View style={Styles.contentStyle}>
        <RenderFlatList 
          addInterests={this.props.addInterests}
          removeInterests={this.props.removeInterests}
          content={section.content}
        />
      </View>  
    );
  }

  render() {
    return (
      <Accordion
        underlayColor='#fff'
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent.bind(this)}
      />
    );
  }
}

const Styles = {
  headerStyle: {
    backgroundColor: '#273746',
    paddingLeft: 15,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 2
  },
  headerTextStyle: {
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  contentStyle: {
    height: 300
  }
}
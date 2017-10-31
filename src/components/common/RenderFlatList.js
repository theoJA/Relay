import React from 'react';
import { View, Text, FlatList } from "react-native";
import { CardSection } from '../common';
import { AddRemoveButton } from '../common/AddRemoveButton';

export class RenderFlatList extends React.Component {

  _keyExtractor = (item, subject) => item.subject; 

  render() {
    return (
      <FlatList 
        data={this.props.content}
        keyExtractor={this._keyExtractor}
        renderItem={
          ({item}) => 
            <CardSection style={Styles.container}>
              <Text style={Styles.descStyle}>{item.subject}</Text>
              <AddRemoveButton 
                id={item.subject}
              />
            </CardSection>
        }
      />
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  descStyle: {
    fontSize: 15,
    paddingLeft: 18,
    flex: 5
  }
}
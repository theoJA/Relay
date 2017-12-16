import React, { Component } from "react";
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Image, TouchableHighlight, Button, ScrollView } from "react-native";
import Modal from 'react-native-modal';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from "moment";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        interests: [],
        username: ''
      },
      bookmarked: [],
      articleJSX: [],
      articles: [],
      articleIds: null
    }
  }

  componentWillMount() {
    let { interests, username, articles, articleIds, bookmarked } = this.state;
    let { currentUser } = firebase.auth();

    try {
      firebase.database().ref('/articles')
      .on('value', snapshot => {
        articles = snapshot.val(); // object of articles, key: articleID, value: {articleData,authorUserID,tags,....}
        articleIds = Object.keys(snapshot.val()); // an array of article IDs. Will be used for transversing the object of articles  
        this.setState({
          articles,
          articleIds
        }, () => this.reverseArticleIds());
      });
    } finally {
      firebase.database().ref(`/users/${currentUser.uid}/profile`)
      .on('value', snapshot => {
        let profileId = Object.keys(snapshot.val())[0];
        interests = snapshot.val()[profileId].interests;
        username = snapshot.val()[profileId].username;
        this.setState({
          profile: {
            interests,
            username
          }
        })  
      });
    }
  }

  reverseArticleIds() {
    let { articleIds } = this.state;
    let tempArticleIds = [];

    try {
      for (let i = parseInt(articleIds.length) - 1; i >= 0; i--) {
        tempArticleIds.push(articleIds[i])
      }
    } finally {
      this.setState({
        articleIds: tempArticleIds
      });
    }

  }

  renderProfPic(authorId) {
    let profilePic = 'notSet';

    firebase.database().ref(`/users/${authorId}/profile`)
    .on('value', snapshot => {
      let profileId = Object.keys(snapshot.val())[0];
      profilePic = snapshot.val()[profileId].profilePic;
    })
             
    if (profilePic === 'null') {
      return (
        <Ionicons style={{ borderRadius: 8, margin: 15, marginLeft: 18, marginRight: 20 }} 
        name="md-person" size={70} color="black" />
      )
    } else { 
      return (
        <Image 
        source={{ uri: profilePic }} 
        style={{ width: 60, height: 60, borderRadius: 8, margin: 15 }}/>
      )
    }

  }

  renderUsername(authorId) {
    let username;
    firebase.database().ref(`/users/${authorId}/profile`)
    .on('value', snapshot => {
      let profileId = Object.keys(snapshot.val())[0];
      username = snapshot.val()[profileId].username;
    })
    return username;
  }

  addToBookMarks() {
    let { bookmarked } = this.state
    let { currentUser } = firebase.auth();
    bookmarked.push(this.id);
    
    firebase.database().ref(`/users/${currentUser.uid}/profile`)
    .update({ bookmarked: bookmarked });
    
    this.setState({
      bookmarked
    }) 
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerLeft = (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Ionicons style={Styles.iconStyle} name="md-menu" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  
    let headerRight = (
      <View style={Styles.navbarItemStyle}>
        <TouchableOpacity
          onPress={() => {navigation.navigate('CreateNote')}}
        >
          <Ionicons style={Styles.iconStyle} name="ios-add-circle" size={32} color="white" />
        </TouchableOpacity>
          
        <TouchableOpacity>
          <Ionicons style={Styles.iconStyle} name="ios-funnel" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons style={Styles.iconStyle} name="md-search" size={32} color="white" />
        </TouchableOpacity>
      </View> 
    );

    return {
      title: 'Home',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
      headerLeft,
    };
  };

  viewArticle() {
    const { articles } = this.that.state;
    const { navigate } = this.that.props.navigation;
    navigate('ViewNote', { articleObj: articles[this.id] })
  }

  render() {
    const { profile, articles, articleIds } = this.state;

    return ( 
      <ScrollView style={Styles.container}>
        {articleIds && (
            articleIds.map((id,index) => {
              return <TouchableOpacity key={id} id={id} that={this} style={Styles.listItemContainer}
                onPress={this.viewArticle}  
              >
                  <View style={{ margin: 10, marginBottom: -2 }}>
                    <Text style={Styles.listItemTitle}>
                      {articles[id].title}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    {this.renderProfPic(articles[id].authorUserId)}
                    <View style={{ flexDirection: "column", marginTop: 15 }}>
                      <Text>
                        {this.renderUsername(
                          articles[id].authorUserId
                        )}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        {moment(
                          articles[id].createdDate
                        ).fromNow()}
                      </Text>
                    </View>

                    <View style={{justifyContent: 'flex-start', marginLeft: 20, width: 300, padding: 20}}>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {articles[id].tags.map(tag => {
                          return (
                              <Text
                                key={tag}
                                style={{
                                  padding: 2,
                                  margin: 1,
                                  fontSize: 11,
                                  borderWidth: 1,
                                  borderRadius: 2
                                }}
                              >
                                {tag}
                              </Text>
                          );
                        })}
                      </View>
                    </View>

                    <TouchableOpacity 
                      onPress={this.addToBookMarks.bind(this)}
                    >
                      <FontAwesome style={{ borderRadius: 8, margin: 15 }} 
                                name="bookmark-o" size={40} color="black" />
                    </TouchableOpacity>
                    

                  </View>
                </TouchableOpacity>;
            }) 
          )
        }
      </ScrollView>
    );
  };
}

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#EAEDED',
  },
  listItemContainer: {
    backgroundColor: '#fff', marginBottom: 2, marginLeft: 2, marginRight: 2, borderRadius: 4 
  },
  listItemTitle: {
    fontSize: 25, fontWeight: 'bold'
  },
  navbarItemStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
    borderRadius: 5,
    alignItems: 'center'
  },
  modalClose: {
    borderColor: '#000', 
    borderRadius: 5, 
    borderWidth: 1, 
    padding: 5,
    textAlign: 'center',
  }
}

/*
<Modal isVisible={this.state.isModalVisible}>
          <View style={Styles.modalContainer}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._hideModal.bind(this)}>
              <Text style={Styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
*/
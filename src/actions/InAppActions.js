import firebase from 'firebase';
import { 
  GET_PROFILE 
} from "./types";

export default grabUserProfile = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/profile`)
      .on('value', snapshot => {
        let profileId = Object.keys(snapshot.val())[0];
        let profileObj = {
          interests: snapshot.val()[profileId].interests,
          username: snapshot.val()[profileId].username
        };
        dispatch({
          type: GET_PROFILE,
          payload: profileObj
        })
      })
  };

};
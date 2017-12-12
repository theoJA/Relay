import firebase from 'firebase';
import {
  INTEREST_ADDED,
  INTEREST_REMOVED,
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  SIGN_IN_EMAIL,
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_EMAIL_FAIL,
  LOGOUT,
  LOGOUT_ERROR
} from './types';

export const interestAdded = (interest) => {
  return {
    type: INTEREST_ADDED,
    payload: interest
  }
}

export const interestRemoved = (interest) => {
  return {
    type: INTEREST_REMOVED,
    payload: interest
  }
}

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const signInEmail = ({ email, password, interests }) => {
  let tempUserName = email.split('@')[0];

  return (dispatch) => {
    dispatch({ type: SIGN_IN_EMAIL })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => signInEmailSuccess(dispatch, user))
      .catch((error) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            // send a profile object to the user here
            // add interests, default username, etc
            firebase.database().ref(`/users/${user.uid}/profile`)
              .push({ interests, username: tempUserName });
            signInEmailSuccess(dispatch, user);
          })
          .catch(() => signInEmailFail(dispatch));
      });
  };
};

const signInEmailSuccess = (dispatch, user) => {
  dispatch({
    type: SIGN_IN_EMAIL_SUCCESS,
    payload: user
  });
};

const signInEmailFail = (dispatch) => {
  dispatch({
    type: SIGN_IN_EMAIL_FAIL
  });
};

export const logoutRelay = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: LOGOUT
        });
      });
  }
}
import firebase from 'firebase';
import {
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  SIGN_IN_EMAIL,
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_EMAIL_FAIL,
  LOGOUT
} from './types';

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

export const signInEmail = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_EMAIL })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => signInEmailSuccess(dispatch, user))
      .catch((error) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => signInEmailSuccess(dispatch, user))
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
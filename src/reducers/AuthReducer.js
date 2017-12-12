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
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  interests: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    
    case INTEREST_ADDED: {
      return { 
        ...state, 
        interests: [...state.interests, action.payload] 
      }
    }

    case INTEREST_REMOVED: {
      let interestIndex = state.interests.indexOf(action.payload);
      state.interests.splice(interestIndex, 1);
      return { ...state }
    }

    case EMAIL_CHANGED:
      return { ...state, email: action.payload}

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload}

    case SIGN_IN_EMAIL:
      return { ...state, loading: true, error: '' }

    case SIGN_IN_EMAIL_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload }

    case SIGN_IN_EMAIL_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        loading: false
      }

    case LOGOUT:
      return INITIAL_STATE;

    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}
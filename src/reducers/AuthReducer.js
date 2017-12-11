import {
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  SIGN_IN_EMAIL,
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_EMAIL_FAIL,
  LOGOUT
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
      return {
        ...state,
        ...INITIAL_STATE,
      }

    default:
      return state;
  }
}
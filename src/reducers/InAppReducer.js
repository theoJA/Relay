import { 
  GET_PROFILE 
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case GET_PROFILE:
      return action.payload;

    default:
      return state;
  }
}
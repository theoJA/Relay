import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import InAppReducer from "./InAppReducer";

export default combineReducers({
  auth: AuthReducer,
  inApp: InAppReducer
});
import { combineReducers } from 'redux'
import settingSlice from "../store/slice/settingSlice";
import authSlice from "../store/slice/authSlice";

const rootReducer = combineReducers({
  setting: settingSlice.reducer,
  auth: authSlice.reducer,
})

export default rootReducer

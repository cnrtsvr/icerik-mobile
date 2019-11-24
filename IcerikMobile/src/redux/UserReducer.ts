import {
  IUserActionTypes,
  IUser,
  REMOVE_TOKEN,
  REMOVE_USER_ID,
  REMOVE_USER_LOGIN_DATA,
  REMOVE_USER_PROFILE_DATA,
  SAVE_TOKEN,
  SAVE_USER_ID,
  SAVE_USER_LOGIN_DATA,
  SAVE_USER_PROFILE_DATA,
  LOGOUT
} from './types/user';

const INITIAL_STATE: IUser = {
  token: null,
  userId: null,
  userLoginData: null,
  userProfileData: null
};

function userReducer(state = INITIAL_STATE, action: IUserActionTypes): IUser {
  switch (action.type) {
    case SAVE_USER_PROFILE_DATA:
      return {...state, userProfileData: action.payload };
    case SAVE_USER_LOGIN_DATA:
      return {...state, userLoginData: action.payload };
    case SAVE_TOKEN:
      return {...state, token: action.payload };
    case SAVE_USER_ID:
      return {...state, userId: action.payload };
    case REMOVE_USER_PROFILE_DATA:
      return {...state, userProfileData: null };
    case REMOVE_USER_LOGIN_DATA:
      return {...state, userLoginData: null };
    case REMOVE_TOKEN:
      return {...state, token: null };
    case REMOVE_USER_ID:
      return {...state, userId: null };
    case LOGOUT:
      return {...INITIAL_STATE};
    default:
      return state;
  }
}

export default userReducer;

import {
  IUserActionTypes,
  IUserLoginData,
  IUserProfileData,
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

export function saveUserLoginData(userLoginData: IUserLoginData): IUserActionTypes {
  return {
    type: SAVE_USER_LOGIN_DATA,
    payload: userLoginData
  };
}

export function saveUserProfileData(userProfileData: IUserProfileData): IUserActionTypes {
  return {
    type: SAVE_USER_PROFILE_DATA,
    payload: userProfileData,
  }
}

export function saveToken(token: string): IUserActionTypes {
  return {
    type: SAVE_TOKEN,
    payload: token,
  }
}

export function saveUserId(userId: number): IUserActionTypes {
  return {
    type: SAVE_USER_ID,
    payload: userId
  }
}

export function removeToken(): IUserActionTypes {
  return {
    type: REMOVE_TOKEN
  }
}

export function removeUserId(): IUserActionTypes {
  return {
    type: REMOVE_USER_ID
  }
}

export function removeUserLoginData(): IUserActionTypes {
  return {
    type: REMOVE_USER_LOGIN_DATA
  }
}


export function removeUserProfileData() {
  return {
    type: REMOVE_USER_PROFILE_DATA
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

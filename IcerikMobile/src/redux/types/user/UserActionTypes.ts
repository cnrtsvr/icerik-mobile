import { IUserProfileData, IUserLoginData } from "./UserTypes";

export const SAVE_USER_PROFILE_DATA = 'SAVE_USER_PROFILE_DATA';
export const SAVE_USER_LOGIN_DATA = 'SAVE_USER_LOGIN_DATA';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_USER_ID = 'SAVE_USER_ID';
export const REMOVE_USER_PROFILE_DATA = 'REMOVE_USER_PROFILE_DATA';
export const REMOVE_USER_LOGIN_DATA = 'REMOVE_USER_LOGIN_DATA';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const REMOVE_USER_ID = 'REMOVE_USER_ID';
export const LOGOUT = 'LOGOUT';

interface ISaveUserProfileDataAction {
  type: typeof SAVE_USER_PROFILE_DATA,
  payload: IUserProfileData
}

interface ISaveUserLoginDataAction {
  type: typeof SAVE_USER_LOGIN_DATA,
  payload: IUserLoginData
}

interface ISaveTokenAction {
  type: typeof SAVE_TOKEN,
  payload: string
}

interface ISaveUserIdAction {
  type: typeof SAVE_USER_ID,
  payload: number
}

interface IRemoveUserProfileDataAction {
  type: typeof REMOVE_USER_PROFILE_DATA
}

interface IRemoveUserLoginDataAction {
  type: typeof REMOVE_USER_LOGIN_DATA
}

interface IRemoveTokenAction {
  type: typeof REMOVE_TOKEN
}

interface IRemoveUserIdAction {
  type: typeof REMOVE_USER_ID
}

interface ILogoutAction {
  type: typeof LOGOUT
}


export type IUserActionTypes =
  ISaveUserProfileDataAction
  | ISaveUserLoginDataAction
  | ISaveTokenAction
  | ISaveUserIdAction
  | IRemoveUserProfileDataAction
  | IRemoveUserLoginDataAction
  | IRemoveTokenAction
  | IRemoveUserIdAction
  | ILogoutAction;

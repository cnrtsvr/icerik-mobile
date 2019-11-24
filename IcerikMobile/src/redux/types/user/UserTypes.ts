export interface IUser {
  token: string | null,
  userId: number | null,
  userProfileData: IUserProfileData | null,
  userLoginData: IUserLoginData | null
}

export interface IUserProfileData {
  balance: number,
  email: string,
  full_name: string,
  id: number,
  partnership_requests: number,
  premium: boolean,
  profile_completed: boolean,
  score: {
    writer: number,
    writer_level: {
      title: string
    },
    editor: number
  },
  user_type_id: number,
  user_type_title: string
}

export interface IUserLoginData {
  api_key: string,
  profile_completed: boolean,
  redirect: string,
  user_balance: number,
  user_email: string,
  user_id: number,
  user_role: string,
  user_type_id: number
}

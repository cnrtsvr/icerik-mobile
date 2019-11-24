import React from 'react';
import UserCard from './UserCard';
import {IUserProfileData} from "../../redux/types/user";

export interface Props {
  userProfileData: IUserProfileData | null,
  logoutFunc: Function
}

class Profile extends React.Component<Props> {
  render() {
    const { userProfileData, logoutFunc } = this.props;
    return (
      <UserCard userCardData={userProfileData} logoutFunc={logoutFunc}/>
    )
  }
}

export default Profile;

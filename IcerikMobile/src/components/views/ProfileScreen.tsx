import React from "react";
import {connect} from 'react-redux';
import axios from '../../axios';
import {saveUserProfileData, logout} from '../../redux/UserActions';
import Profile from '../profile/Profile';
import {Container, Content, Icon} from 'native-base';
import AppHeader from '../core/AppHeader';
import { NavigationDrawerProp } from "react-navigation-drawer";
import {IUser} from "../../redux/types/user";
import {AppState} from "../../redux/RootReducer";

export interface Props {
  navigation: NavigationDrawerProp<any>,
  user: IUser,
  dispatch: {
    saveUserProfileData: typeof saveUserProfileData,
    logout: typeof logout
  }
}

class ProfileScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    drawerLabel: 'Profilim',
    drawerIcon: (
        <Icon name='person'/>
    ),
  };

  componentDidMount(): void {
    const {dispatch, user, navigation} = this.props;
    if (!user || !user.token) {
      navigation.navigate('Login');
    } else {
      axios.get('v1/profile/me').then((response) => {
        dispatch.saveUserProfileData(response.data.user);
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  logoutFunc() {
    const {dispatch, navigation} = this.props;
    dispatch.logout();
    navigation.navigate('Login');
  }

  render() {
    const {user, navigation} = this.props;
    return (
      <Container>
        <AppHeader title={'Profilim'} openDrawer={navigation.openDrawer}/>
        <Content padder>
          <Profile userProfileData={user.userProfileData} logoutFunc={() => this.logoutFunc()}/>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const {user} = state;
  return {user}
};

const mapDispatchToProps = {
  dispatch: {
    saveUserProfileData,
    logout
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

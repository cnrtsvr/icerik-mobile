import React from 'react';
import { Image, StyleSheet } from "react-native";
import LoginForm from '../login/LoginForm';
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import {AppState} from "../../redux/RootReducer";
import {IUser} from "../../redux/types/user";

export interface Props {
  navigation: NavigationStackProp<any>,
  user: IUser
}

class LoginScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
        <Container>
          <Grid>
            <Row style={styles.logoContainer}>
              <Image resizeMode='contain'
                     style={styles.logo}
                     source={require('../../assets/img/icerik-logo.png')}/>
            </Row>
            <Row style={styles.formContainer}>
              <LoginForm parentNavigate={navigation}/>
            </Row>
          </Grid>
        </Container>
    )
  }

  componentDidMount(): void {
    const { user, navigation } = this.props;
    if (user && user.token) {
      navigation.navigate('Home');
    }
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  formContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    flex: 1,
  }
});

const mapStateToProps = (state: AppState) => {
  const { user } = state;
  return { user }
};

export default connect(mapStateToProps)(LoginScreen);


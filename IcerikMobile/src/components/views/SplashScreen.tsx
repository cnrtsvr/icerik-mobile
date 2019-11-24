import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import {connect} from "react-redux";
import {IUser} from "../../redux/types/user";
import {AppState} from "../../redux/RootReducer";
import { NavigationSwitchProp } from 'react-navigation';


export interface Props {
  navigation: NavigationSwitchProp,
  user: IUser
}

class SplashScreen extends React.Component<Props> {
  render() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row size={2} style={styles.logoContainer}>
            <Image resizeMode='contain'
                   style={styles.logo}
                   source={require('../../assets/img/icerik.com-icon.png')}/>
          </Row>
          <Row size={1} style={styles.textContainer}>
            <Text style={styles.text}>
              icerik.com
            </Text>
          </Row>
        </Grid>
      </Container>
    )
  }

  componentDidMount(): void {
    setTimeout(() => this.navigateTo(), 1000)

  }

  navigateTo() {
    const { user, navigation } = this.props;
    navigation.navigate((user && user.token) ? 'App' : 'Auth')
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'flex-start',
    flexGrow: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold'
  },
  logo: {
    flex: 1,
  }
});

const mapStateToProps = (state: AppState) => {
  const { user } = state;
  return { user }
};

export default connect(mapStateToProps)(SplashScreen);

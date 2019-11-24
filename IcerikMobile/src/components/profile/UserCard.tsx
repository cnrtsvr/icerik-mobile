import React from 'react';
import {Card, CardItem, Button, Icon, Body, Text} from "native-base";
import {Image, StyleSheet} from "react-native";
import {Col, Row, Grid} from 'react-native-easy-grid';
import {IUserProfileData} from "../../redux/types/user";

export interface Props {
  logoutFunc: Function,
  userCardData: IUserProfileData | null
}

class UserCard extends React.Component<Props> {

  logout() {
    const {logoutFunc} = this.props;
    if (logoutFunc) {
      logoutFunc();
    }
  }

  render() {
    const {userCardData} = this.props;

    return (
      <Card>
        <CardItem>
          <Body style={styles.container}>
            <Image style={styles.avatar} source={require('../../assets/img/default-user.png')}/>
            <Text style={styles.name}>{userCardData ? userCardData.full_name : ''}</Text>
            <Text style={styles.userType}>{userCardData ? userCardData.user_type_title : ''}</Text>
            <Text style={styles.info}>{userCardData ? userCardData.email : ''}</Text>
            <Grid style={styles.scoreGridTop}>
              <Col size={2} style={styles.iconCol}>
                <Image style={styles.icon} source={require('../../assets/img/yazar-icon.png')}/>
              </Col>
              <Col size={3}>
                <Row>
                  <Text>{userCardData ? 'userCardData.score.writer_level.title' : ''}</Text>
                </Row>
                <Row>
                  <Text>{userCardData ? userCardData.score.writer : ''}</Text>
                </Row>
              </Col>
            </Grid>
            <Grid style={styles.scoreGridBottom}>
              <Col size={2} style={styles.iconCol}>
                <Image style={styles.icon} source={require('../../assets/img/editor-icon.png')}/>
              </Col>
              <Col size={3}>
                <Row>
                  <Text>{'Editör'}</Text>
                </Row>
                <Row>
                  <Text>{userCardData ? userCardData.score.editor : ''}</Text>
                </Row>
              </Col>
            </Grid>
            <Button block danger iconRight style={styles.button} onPress={() => this.logout()}>
              <Icon name='log-out'/>
              <Text style={{color: 'white'}}>Çıkış Yap</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreGridTop: {
    marginTop: 50,
  },
  scoreGridBottom: {
    marginTop: 15,
    marginBottom: 50,
  },
  iconCol: {
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: 'white',
  },
  button: {
    justifyContent: 'center',
  },
  icon: {
    width: 48,
    height: 48,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  userType: {
    fontSize: 18,
    color: "#868686",
    marginTop: 10
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
});

export default UserCard;

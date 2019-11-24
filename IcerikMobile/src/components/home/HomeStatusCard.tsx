import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, H1, H3, Icon } from "native-base";
import { Grid, Row, Col } from 'react-native-easy-grid';

export interface Props {
  count: number,
  userTitle: string,
  contentTitle: string,
  icon: string,
  iconColor: string,
  userTitleColor: string,
  contentTitleColor?: string,
  onPress: Function
}

class HomeStatusCard extends React.Component<Props> {
  render() {
    const { count, userTitle, contentTitle, icon, iconColor, userTitleColor, contentTitleColor, onPress } = this.props;
    const iconStyles = {
      ...styles.icon,
      color: iconColor || '#eeeeee'
    };
    const userTitleStyle = {
      marginBottom: 5,
      color: userTitleColor || undefined
    };
    const contentTitleStyle = {
      color: contentTitleColor || 'rgba(110, 110, 110, 1)'
    };
    return (
        <Card style={styles.card}>
          <CardItem cardBody button onPress={() => onPress()}>
            <Grid>
              <Row style={styles.row}>
                <Col style={styles.iconCol}>
                  <Icon type={'FontAwesome5'} name={icon} style={iconStyles}/>
                </Col>
                <Col style={styles.countCol}>
                  <H1 style={styles.count}>{count ? count : 0}</H1>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col style={styles.nameCol}>
                  <H3 style={userTitleStyle}>{userTitle}</H3>
                  <H3 style={contentTitleStyle}>{contentTitle}</H3>
                </Col>
              </Row>
            </Grid>
          </CardItem>
        </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 200,
  },
  row: {
    height: 100
  },
  iconCol: {
    flex: 2
  },
  countCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30
  },
  nameCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  icon: {
    fontSize: 50,
    paddingLeft: 20,
    paddingTop: 20,
    padding: 10,
    width: '100%'
  },
  count: {
    fontWeight: 'bold',
    fontSize: 28
  }
});

export default HomeStatusCard;

import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, H1, H3, Icon} from "native-base";
import { Grid, Row, Col } from 'react-native-easy-grid';
import currencyService from '../../services/BalanceService';

export interface Props {
  cardTitle: string,
  balance: number
}

class BalanceCard extends React.Component<Props> {
  render() {
    const { cardTitle, balance } = this.props;
    return (
        <Card style={styles.balanceCard}>
          <CardItem cardBody>
            <Grid>
              <Row style={styles.row}>
                <Col style={styles.iconCol}>
                  <Icon type={'FontAwesome5'} name={'check'} style={styles.icon}/>
                </Col>
                <Col style={styles.balanceCol}>
                  <Row  style={styles.textRow}>
                    <H1 style={styles.balance}>{currencyService.getCurrencyString(balance)}</H1>
                  </Row>
                  <Row style={styles.textRow}>
                    <H3 style={styles.title}>{cardTitle}</H3>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </CardItem>
        </Card>
    )
  }
}

const styles = StyleSheet.create({
  balanceCard: {
    height: 200,
  },
  row: {
    height: 200
  },
  textRow: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    paddingTop: 10
  },
  icon: {
    fontSize: 75,
    width: '100%',
    paddingLeft: 30,
    color: '#81c784'
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  title: {
    color: '#6e6e6e'
  }
});

export default BalanceCard;

import React from 'react';
import {Container, Content} from 'native-base';
import AppHeader from '../core/AppHeader';
import BalanceCard from '../balance/BalanceCard';
import BalanceHistoryCard from '../balance/BalanceHistoryCard';
import axios from '../../axios';
import {connect} from "react-redux";
import {processBalanceData} from '../balance/BalanceListHelper';
import { NavigationStackProp } from 'react-navigation-stack';
import {IUser} from "../../redux/types/user";
import {AppState} from "../../redux/RootReducer";
import {IBalance, IBalanceSummary} from "../balance/BalanceTypes";
import {AxiosError, AxiosResponse} from "axios";


export interface Props {
  navigation: NavigationStackProp<any>,
  user: IUser
}

export interface State {
  currentData: IBalanceSummary | null,
  history: any
}

class BalanceScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentData: null,
      history: null
    }
  }

  componentDidMount(): void {
    const {user} = this.props;
    axios.post('v1/profile/paymenthistory', {
      user_id: user.userId
    }).then((response: AxiosResponse<IBalance>) => {
      const obj = processBalanceData(response.data.payments);
      this.setState({
        currentData: response.data.summary,
        history: obj
      });
    }).catch((e: AxiosError<IBalance>) => {
      console.log(e);
    })
  }

  render() {
    const { navigation } = this.props;
    const { currentData, history } = this.state;
    return (
        <Container>
          <AppHeader title={'Bakiyem'} openDrawer={navigation.openDrawer}/>
          <Content padder>
            <BalanceCard cardTitle={'Güncel Bakiyem'} balance={currentData ? currentData.current / 100 : 0}/>
            <BalanceCard cardTitle={'Tüm Kazancım'} balance={currentData ? currentData.all / 100 : 0}/>
            {
              history
                ? history.map((item: any, index: number) => {
                    return(
                        <BalanceHistoryCard item={item} key={'balanceHistoryCard_' + index} index={index}/>
                    )
                  })
                : null
            }
          </Content>
        </Container>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const {user} = state;
  return {user}
};

export default connect(mapStateToProps)(BalanceScreen);

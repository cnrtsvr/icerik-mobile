import React from "react";
import {Container, Content} from 'native-base';
import AppHeader from '../core/AppHeader';
import HomeDashboard from '../home/HomeDashboard';
import { NavigationStackProp } from 'react-navigation-stack';

export interface Props {
  navigation: NavigationStackProp<any>
}


class HomeScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <AppHeader title={'Ana Sayfa'} openDrawer={navigation.openDrawer}/>
        <Content padder>
          <HomeDashboard navigation={navigation}/>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;

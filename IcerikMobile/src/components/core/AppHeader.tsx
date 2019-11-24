import React from "react";
import { Header, Title, Left, Right, Button, Icon } from 'native-base';

export interface Props {
  title: string,
  hideMenuIcon?: boolean
  hasTabs?: boolean
  openDrawer?: Function
  goBack?: Function
  hasBackIcon?: boolean
}

class AppHeader extends React.Component<Props> {
  render() {
    const { title, hideMenuIcon, hasTabs, openDrawer, goBack, hasBackIcon } = this.props;

    let leftPart = hideMenuIcon
        ? null
        : <Button transparent onPress={() => openDrawer ? openDrawer() : () => {}}>
            <Icon name='menu'/>
          </Button>;
    if(!leftPart) {
      leftPart = hasBackIcon
        ? <Button transparent onPress={() => goBack ? goBack() : () => {}}>
            <Icon name='arrow-back'/>
          </Button>
        : null
    }

    return (
        <Header hasTabs={!!hasTabs}>
          <Left>
            {leftPart}
          </Left>
          <Title style={{marginTop: 13}}>{title}</Title>
          <Right/>
        </Header>
    );
  }
}

export default AppHeader;

import React from 'react';
import {Card, CardItem, H3, Left, ListItem, Right, Text} from "native-base";
import {FlatList} from "react-native";
// @ts-ignore
import HTML from "react-native-render-html";
import {NavigationStackProp} from "react-navigation-stack";
import {IListData} from "../../common/types/ListDataType";
import {IContentPoolProcessedDetail, IContentPoolProcessedDetailMasterEditor} from "../../redux/types/content-pool";

export interface Props {
  item: IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor
  index: number
  isButton: boolean
  redirectTo?: string | null
  navigation?: NavigationStackProp<any>
}

interface IListItem extends IListData {
  isHTML?: boolean
}

class ContentDetailCard extends React.Component<Props> {
  renderListItems = (listItem: IListItem) => {
    if(listItem.isHTML) {
      return (
          <ListItem>
            <Text>{listItem.label}:</Text>
            <HTML containerStyle={{paddingLeft: 20, flex:1}} html={listItem.value}/>
          </ListItem>
      )
    }

    return (
        <ListItem>
          <Left>
            <Text>{listItem.label}:</Text>
          </Left>
          <Text>{listItem.value}</Text>
        </ListItem>
    )
  };

  keyExtractor = (item:IListItem, index:number, cardIndex:number) => 'card_' + cardIndex + 'listItem_' + index;

  renderFlatList(cardIndex: number, listData: Array<IListItem>) {
    return (
        <FlatList data={listData} renderItem={({item}) => this.renderListItems(item)} keyExtractor={(item, index) => this.keyExtractor(item, index, cardIndex)}/>
    );
  }

  renderItem(item: IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor, index:number, isButton:boolean) {
    const { redirectTo } = this.props;
    return (
        <Card>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold'}}>{item.content_title}</Text>
            </Left>
            <Right>
              <H3>{item.amount}</H3>
            </Right>
          </CardItem>
          <CardItem cardBody>
            {this.renderFlatList(index, item.listData)}
          </CardItem>
          {
            isButton
              ? <CardItem footer button onPress={() => this.goToContentDetail(item, redirectTo || '')}
                          style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text>Detaya Git</Text>
                </CardItem>
              : null
          }

        </Card>
    )
  };

  goToContentDetail(item: IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor, redirectTo: string) {
    const {navigation} = this.props;
    if(navigation) {
      navigation.navigate(redirectTo, {
        id: item.id
      });
    }
  }

  render() {
    const { item, index, isButton } = this.props;
    return (
        this.renderItem(item, index, isButton)
    )
  }
}

export default ContentDetailCard;


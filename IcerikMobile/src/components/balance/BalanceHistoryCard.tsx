import React from 'react';
import {Card, CardItem, Left, ListItem, Text} from "native-base";
import {FlatList} from "react-native";
import {IBalanceProcessed} from "./BalanceTypes";
import {IListData} from "../../common/types/ListDataType";

export interface Props {
  item: IBalanceProcessed,
  index: number
}

class BalanceHistoryCard extends React.Component<Props> {
  renderListItems = (listItem: IListData) => {
    return (
        <ListItem>
          <Left>
            <Text>{listItem.label}:</Text>
          </Left>
          <Text>{listItem.value}</Text>
        </ListItem>
    )
  };

  keyExtractor = (item: IListData, index: number, cardIndex: number) => 'card_' + cardIndex + 'listItem_' + index;

  renderFlatList(cardIndex: number, listData: Array<IListData>) {
    return (
        <FlatList data={listData} renderItem={({item}) => this.renderListItems(item)} keyExtractor={(item, index) => this.keyExtractor(item, index, cardIndex)}/>
    );
  }

  renderItem(item: IBalanceProcessed, index: number) {
    return (
        <Card>
          <CardItem cardBody>
            {this.renderFlatList(index, item.listData)}
          </CardItem>
        </Card>
    )
  };

  render() {
    const { item, index } = this.props;
    return (
        this.renderItem(item, index)
    )
  }
}

export default BalanceHistoryCard;

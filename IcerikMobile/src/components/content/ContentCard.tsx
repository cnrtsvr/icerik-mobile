import React from 'react';
import {Card, CardItem, Left, Text, View} from "native-base";
// @ts-ignore
import HTML from "react-native-render-html";
import {StyleSheet} from 'react-native';

export interface Props {
  content?: string
}

class ContentCard extends React.Component<Props> {
  render() {
    const { content } = this.props;

    return (
        <Card style={styles.contentCard}>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold'}}>İçerik</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <HTML containerStyle={{padding: 10}}
                  listsPrefixesRenderers={{
                    ul: (_htmlAttribs: any, _children: any, _convertedCSSStyles: any, passProps: any) => {
                      return <View style={{
                        marginRight: 10,
                        width: 10 / 2.8,
                        height: 10 / 2.8,
                        marginTop: 10,
                        borderRadius: 10 / 2.8,
                        backgroundColor: "black",
                      }}/>
                    }
                  }}
                  tagsStyles={{
                    p: {marginTop: 3, marginBottom: 5}
                  }}
                  html={content || '<p>Henüz bir içerik kaydedilmemiş!</p>'}/>
          </CardItem>
        </Card>
    )
  }
}

const styles = StyleSheet.create({
  contentCard: {
    minHeight: 134
  }
});

export default ContentCard;

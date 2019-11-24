import React from 'react';
import { View, Card, CardItem, Left, Text} from "native-base";
// @ts-ignore
import HTML from "react-native-render-html";

export interface Props {
  desc?: string
}

class ContentDescriptionCard extends React.Component<Props> {
  render() {
    const {desc} = this.props;

    return (
        <Card>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold'}}>İçerik Açıklaması</Text>
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
                  html={desc}/>
          </CardItem>
        </Card>
    )
  }
}

export default ContentDescriptionCard;

import React from "react";
import {Card, CardItem, Left, Text, Button, Body} from "native-base";

export interface Props {
  keywords?: Array<string>
}

interface IStyleObj {
  marginBottom: number,
  backgroundColor: string,
  marginTop?: number
}

class ContentKeywordsCard extends React.Component<Props> {
  render() {
    const { keywords } = this.props;
    return (
        <Card>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold'}}>Anahtar Kelimeler</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Body style={{flexDirection: 'column', padding: 10}}>
              { (keywords || []).map((item, index) => {
                  const styleObj:IStyleObj = {
                    marginBottom: 10,
                    backgroundColor: '#F1F1F1'
                  };
                  if(index === 0) styleObj.marginTop = 10;
                  return (<Button rounded
                                  key={'contentKeywordsButton_' + index}
                                  disabled
                                  vertical style={styleObj}>
                      <Text style={{color: '#000000'}}>{item}</Text>
                  </Button>)
                })
              }
            </Body>
          </CardItem>
        </Card>
    )
  }
}

export default ContentKeywordsCard;

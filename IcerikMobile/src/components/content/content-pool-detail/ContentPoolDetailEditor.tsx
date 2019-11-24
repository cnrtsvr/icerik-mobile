import React from 'react';
import ContentDetailCard from '../ContentDetailCard';
import {Button, Container, Content, Text} from 'native-base';
import AppHeader from "../../core/AppHeader";
import axios from '../../../axios';
import ContentDescriptionCard from '../ContentDescriptionCard';
import {processEditorItem} from "../../../redux/ContentPoolHelpers";
import AppLoader from "../../core/AppLoader";
import ContentPoolDetailToSDialog from "./ContentPoolDetailToSDialog";
import ContentKeywordsCard from "../ContentKeywordsCard";
import { NavigationStackProp } from "react-navigation-stack";
import {IContentPoolProcessedDetail} from "../../../redux/types/content-pool";

export interface Props {
  navigation: NavigationStackProp<{id: number}>
}

export interface State {
  cardData: IContentPoolProcessedDetail | null,
  tosVisible: boolean
}

class ContentPoolDetailEditor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      cardData: null,
      tosVisible: false
    }
  }

  componentWillMount(): void {
    const { navigation } = this.props;
    const id = navigation.getParam('id', null);
    axios.post('v1/contentpool/detail', {
      id
    }).then((response) => {
      const processedData = processEditorItem(response.data);
      this.setState({
        cardData: processedData
      });
    });
  }

  openToSDialog() {
    this.setState({
      tosVisible: true
    });
  }

  acceptJob() {
    this.setState({
      tosVisible: false
    });
    /*
    axios.post('editor/getjob', {
      id: this.state.contentId
    }).then(response => {

    })

     */
  }

  renderContent() {
    const { cardData, tosVisible } = this.state;
    if (!cardData) {
      return (
          <AppLoader title={'İçerik Detayı Yükleniyor'}/>
      )
    }
    return (
        <Content padder>
          <ContentDetailCard item={cardData} isButton={false} index={0}/>
          <ContentDescriptionCard desc={cardData.content_description}/>
          <ContentKeywordsCard keywords={cardData.keywordArray}/>
          <Button block primary onPress={() => this.openToSDialog()}
                  style={{marginTop: 10}}>
            <Text>İşi Kabul Et</Text>
          </Button>
          <ContentPoolDetailToSDialog isVisible={tosVisible} acceptJob={this.acceptJob} userTypeId={4}/>
        </Content>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
        <Container>
          <AppHeader title={'Editor İçerik Detayı'} hideMenuIcon={true} hasBackIcon={true} goBack={navigation.goBack}/>
          {this.renderContent()}
        </Container>
    )
  }
}

export default ContentPoolDetailEditor;

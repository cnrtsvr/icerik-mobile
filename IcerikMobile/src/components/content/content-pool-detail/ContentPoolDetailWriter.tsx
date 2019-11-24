import React from 'react';
import ContentDetailCard from '../ContentDetailCard';
import {Container, Content, Button, Text} from 'native-base';
import AppHeader from "../../core/AppHeader";
import AppLoader from '../../core/AppLoader';
import axios from '../../../axios';
import { processWriterItem } from '../../../redux/ContentPoolHelpers';
import ContentDescriptionCard from "../ContentDescriptionCard";
import ContentKeywordsCard from '../ContentKeywordsCard';
import ContentPoolDetailToSDialog from './ContentPoolDetailToSDialog';
import {NavigationStackProp} from "react-navigation-stack";
import {IContentPoolProcessedDetail} from "../../../redux/types/content-pool";

export interface Props {
  navigation: NavigationStackProp<{id: number}>
}

export interface State {
  cardData: IContentPoolProcessedDetail | null,
  tosVisible: boolean,
  contentId: number | null
}

class ContentPoolDetailWriter extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      contentId: null,
      cardData: null,
      tosVisible: false
    };
    this.acceptJob = this.acceptJob.bind(this);
  }

  componentWillMount(): void {
    const { navigation } = this.props;
    const id = navigation.getParam('id', null);
    this.setState({
      contentId: id
    });
    axios.post('v1/contentpool/detail', {
      id
    }).then((response) => {
      const processedData = processWriterItem(response.data);
      this.setState({
        cardData: processedData
      })
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
    axios.post('writer/getjob', {
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
          <ContentPoolDetailToSDialog isVisible={tosVisible} acceptJob={this.acceptJob} userTypeId={3}/>
       </Content>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <AppHeader title={'Yazar İçerik Detayı'} hideMenuIcon={true} hasBackIcon={true} goBack={navigation.goBack}/>
        {this.renderContent()}
      </Container>
    )
  }
}

export default ContentPoolDetailWriter;

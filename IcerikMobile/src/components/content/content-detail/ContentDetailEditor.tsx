import React from 'react';
import ContentDetailCard from '../ContentDetailCard';
import {Container, Content, Button, Text} from 'native-base';
import AppHeader from "../../core/AppHeader";
import AppLoader from '../../core/AppLoader';
import axios from '../../../axios';
import { processEditorItem } from '../../../redux/ContentPoolHelpers';
import ContentDescriptionCard from "../ContentDescriptionCard";
import ContentKeywordsCard from '../ContentKeywordsCard';
import ContentCard from "../ContentCard";
import ContentRevisionsDialog from "../ContentRevisionsDialog";
import { NavigationStackProp } from "react-navigation-stack";

export interface Props {
  navigation: NavigationStackProp<{id: number}>
  contentId: number
}

export interface State {
  contentId: number | null
  contentData: any | null
  revisionsVisible: boolean
}

class ContentDetailEditor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      contentId: null,
      contentData: null,
      revisionsVisible: false
    };
  }

  componentWillMount(): void {
    const { navigation, contentId } = this.props;
    const id = contentId ? contentId : navigation.getParam('id', null);
    this.setState({
      contentId: id
    });
    axios.post('v1/editor/jobdetail', {
      id
    }).then((response) => {
      const processedData = processEditorItem(response.data);
      this.setState({
        contentData: processedData
      })
    });
  }

  openRevisionsDialog() {
    this.setState({
      revisionsVisible: true
    });
  }

  closeRevisionsDialog() {
    this.setState({
      revisionsVisible: false
    });
  }

  renderContent() {
    const { contentData, revisionsVisible } = this.state;
    if (!contentData) {
      return (
          <AppLoader title={'İçerik Detayı Yükleniyor'}/>
      )
    }

    const revisions = contentData.submissions.filter((el: any) => el.status === 2);
    revisions.push({
      message: 'Test Mesajı',
    });
    const revisionsItems = revisions && revisions.length > 0
        ? [<Button block primary onPress={() => this.openRevisionsDialog()}>
          <Text>Revizyonlar</Text>
        </Button>,
          <ContentRevisionsDialog isVisible={revisionsVisible}
                                  closeDialog={this.closeRevisionsDialog.bind(this)}
                                  revisions={revisions}/>]
        : [];

    return (
        <Content padder>
          {
            revisionsItems ? revisionsItems[0] : null
          }
          <ContentDetailCard item={contentData} isButton={false} redirectTo={null} index={0}/>
          <ContentDescriptionCard desc={contentData.content_description}/>
          <ContentCard content={contentData.content}/>
          <ContentKeywordsCard keywords={contentData.keywordArray}/>
          {
            revisionsItems ? revisionsItems[1] : null
          }
        </Content>
    )
  }

  render() {
    const { navigation } = this.props;
    const { contentData } = this.state;
    return (
        <Container>
          <AppHeader title={contentData ? contentData.content_title : ''} hideMenuIcon={true} hasBackIcon={true} goBack={navigation.goBack}/>
          {this.renderContent()}
        </Container>
    )
  }
}

export default ContentDetailEditor;

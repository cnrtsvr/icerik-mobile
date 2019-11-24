import React from 'react';
import AppLoader from "../core/AppLoader";
import {Container, Content} from "native-base";
import {NativeScrollEvent, RefreshControl} from "react-native";
import axios from "../../axios";
import ContentDetailCard from "../content/ContentDetailCard";
import AppHeader from "../core/AppHeader";
import { processWriterData, processEditorData, processMasterEditorData } from "../../redux/ContentPoolHelpers";
import {InfiniteScrollListBase, Props, IRequest} from "../../common/InfiniteScrollListBase";
import {IContentPoolProcessedDetail, IContentPoolProcessedDetailMasterEditor} from "../../redux/types/content-pool";

class HomeFinishedJobsList extends InfiniteScrollListBase<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount(): void {
    const { navigation } = this.props;
    const userTypeId = navigation.getParam('userTypeId', null);
    this.setState({
      userTypeId
    });
    this.getFinishedJobsData(userTypeId)
  }

  componentDidUpdate() {
    this.checkRefreshing();
  }

  getFinishedJobsData(userTypeId: number) {
    const controllers: {[key: number]: string} = {
      3: 'writer',
      4: 'editor',
      10: 'mastereditor'
    };
    axios.get('v1/' + controllers[userTypeId] + '/finishedjobs')
        .then(response => {
          let allData: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor> = [];
          switch (userTypeId) {
            case 3:
              allData = processWriterData(response.data);
              break;
            case 4:
              allData = processEditorData(response.data);
              break;
            case 10:
              allData = processMasterEditorData(response.data);
              break;
            default:
              break;
          }
          this.setState({
            allData
          });
        });
  }

  renderContentDetailCard(item: IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor, key: string, userTypeId: number, index:number) {
    const redirect: {[key: number]: string} = {
      3: 'WriterContentDetail',
      4: 'EditorContentDetail',
      10: 'MasterEditorContentDetail'
    };
    return (
        <ContentDetailCard isButton={true} navigation={this.props.navigation}
                           redirectTo={redirect[userTypeId]}
                           index={index}
                           item={item} key={key}/>
    )
  }

  renderItems(shownData: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>) {
    const { dataLoading, lastRowFound, userTypeId } = this.state;

    const renderedElems = shownData.map((item, index) => this.renderContentDetailCard(item, 'dashboardItem_' + index, userTypeId, index));
    if (shownData && shownData.length > 0 && dataLoading && !lastRowFound) {
      renderedElems.push(<AppLoader key={'dashboardLoading'}/>);
    }
    return (
        renderedElems
    )
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
  };

  onRefresh() {
    const { userTypeId } = this.state;
    this.setState({
      isRefreshing: true,
    });
    this.getFinishedJobsData(userTypeId);
  }

  checkRefreshing() {
    const { isRefreshing, isFirstLoad, allData } = this.state;
    if(allData && isFirstLoad) {
      this.setState({
        isFirstLoad: false
      });
      this.requestNewDatas();
    } else if(allData && isRefreshing) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  requestNewDatas() {
    const { currentPage, pageSize, allData } = this.state;
    this.setState({
      dataLoading: true,
      canLoadMoreData: false,
    });

    const newReq = {
      startRow: currentPage * pageSize,
      endRow: (currentPage + 1) * pageSize,
    };
    setTimeout(() => this.getNewDatas(allData, newReq), 500);
  }

  getNewDatas(data:Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>, newReq: IRequest) {
    const { shownData, currentPage } = this.state;

    const newDatas = this.getBlockFromResult(data, newReq);
    const lastRowFound = this.getLastRowResult(data, newReq);

    this.setState({
      shownData: [...shownData, ...newDatas],
      lastRowFound,
      currentPage: currentPage + 1,
      canLoadMoreData: true,
      dataLoading: false,
    });
  }

  getBlockFromResult(data:Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>, request: IRequest) {
    return data.slice(request.startRow, request.endRow);
  }

  getLastRowResult (result:Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>, request: IRequest) {
    return result.length <= request.endRow;
  }

  renderContent() {
    const { shownData, isRefreshing, canLoadMoreData } = this.state;
    if (shownData && shownData.length === 0) {
      return (<AppLoader title={'İçerikler Yükleniyor'}/>);
    }
    return (
        <Content padder refreshControl={
          <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}/>
        }
                 onScroll={({nativeEvent}) => {
                   if (this.isCloseToBottom(nativeEvent)) {
                     if (canLoadMoreData) {
                       this.requestNewDatas();
                     }
                   }
                 }}
                 scrollEventThrottle={400}>
          { this.renderItems(shownData) }
        </Content>
    )
  }

  render() {
    const { navigation } = this.props;
    const { userTypeId } = this.state;
    let headerTitle = '';
    switch (userTypeId) {
      case 3:
        headerTitle += 'Yazar';
        break;
      case 4:
        headerTitle += 'Editör';
        break;
      case 10:
        headerTitle += 'Master Editör';
        break;
      default:
        break;
    }
    headerTitle += ' - Biten';
    return (
        <Container>
          <AppHeader title={headerTitle} hideMenuIcon={true} hasBackIcon={true} goBack={navigation.goBack}/>
          {this.renderContent()}
        </Container>
    )
  }
}

export default HomeFinishedJobsList;

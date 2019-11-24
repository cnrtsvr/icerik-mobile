import React from "react";
import {Container, Content} from 'native-base';
import {NativeScrollEvent, RefreshControl} from "react-native";
import AppHeader from "../../core/AppHeader";
import AppLoader from '../../core/AppLoader';
import {connect} from 'react-redux';
import {clearContentPool, fetchContentPool} from "../../../redux/ContentPoolActions";
import ContentDetailCard from "../ContentDetailCard";
import {InfiniteScrollListBase, Props, IRequest} from "../../../common/InfiniteScrollListBase";
import {AppState} from "../../../redux/RootReducer";
import {IContentPoolProcessedDetail} from "../../../redux/types/content-pool";

interface SpecialProps extends Props {
  dispatch: {
    fetchContentPool: typeof fetchContentPool
    clearContentPool: typeof clearContentPool
  },
  writerPool: Array<IContentPoolProcessedDetail> | null
}

class ContentPoolListWriter extends InfiniteScrollListBase<SpecialProps> {

  constructor(props: SpecialProps) {
    super(props);
  }

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch.clearContentPool();
    dispatch.fetchContentPool();
  }

  componentDidUpdate() {
    this.checkRefreshing();
  }

  renderContentDetailCard(item: IContentPoolProcessedDetail, key: string) {
    return (
        <ContentDetailCard isButton={true} navigation={this.props.navigation}
                           index={0}
                           redirectTo={'WriterPoolDetail'} item={item} key={key}/>
    )
  }

  renderItems(shownData: Array<IContentPoolProcessedDetail>) {
    const { dataLoading, lastRowFound } = this.state;

    const renderedElems = shownData.map((item, index) => this.renderContentDetailCard(item, 'poolItem_' + index));
    if (shownData && shownData.length > 0 && dataLoading && !lastRowFound) {
      renderedElems.push(<AppLoader key={'writerPoolLoading'}/>);
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
    this.setState({
      isRefreshing: true,
    });
    const { dispatch } = this.props;
    dispatch.clearContentPool();
    dispatch.fetchContentPool();
  }

  checkRefreshing() {
    const { isRefreshing, isFirstLoad } = this.state;
    const { writerPool } = this.props;
    if(writerPool && isFirstLoad) {
      this.setState({
        isFirstLoad: false
      });
      this.requestNewDatas();
    } else if(writerPool && isRefreshing) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  requestNewDatas() {
    const { currentPage, pageSize } = this.state;
    const { writerPool } = this.props;

    this.setState({
      dataLoading: true,
      canLoadMoreData: false,
    });

    const newReq = {
      startRow: currentPage * pageSize,
      endRow: (currentPage + 1) * pageSize,
    };
    setTimeout(() => this.getNewDatas((writerPool || []), newReq), 500);
  }

  getNewDatas(data: Array<IContentPoolProcessedDetail>, newReq: IRequest) {
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

  getBlockFromResult(data: Array<IContentPoolProcessedDetail>, request: IRequest) {
    return data.slice(request.startRow, request.endRow);
  }

  getLastRowResult (result: Array<IContentPoolProcessedDetail>, request: IRequest) {
    return result.length <= request.endRow;
  }

  renderContent() {
    const { shownData, isRefreshing, canLoadMoreData } = this.state;
    if (shownData && shownData.length === 0) {
      return (<AppLoader title={'Yazar Havuzu Yükleniyor'}/>);
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
    return (
        <Container>
          <AppHeader title={'Yazar Havuzu'} openDrawer={navigation.openDrawer}/>
          {this.renderContent()}
        </Container>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const {contentPool} = state;
  return {
    writerPool: contentPool.writer,
    poolLoading: contentPool.poolLoading,
  };
};

const mapDispatchToProps = {
  dispatch: {
    fetchContentPool,
    clearContentPool
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPoolListWriter);

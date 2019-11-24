import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {IContentPoolProcessedDetail, IContentPoolProcessedDetailMasterEditor} from "../redux/types/content-pool";


export interface State {
  currentPage: number,
  lastRowFound: boolean,
  pageSize: number,
  shownData: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>,
  isRefreshing: boolean,
  canLoadMoreData: boolean,
  dataLoading: boolean,
  isFirstLoad: boolean,
  allData: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>
  userTypeId: number
}

export interface Props {
  navigation: NavigationStackProp<{userTypeId: number}>
}

export interface IRequest {
  startRow: number,
  endRow: number
}

export abstract class InfiniteScrollListBase<T extends Props> extends React.Component<T, State> {
  protected constructor(props: T) {
    super(props);
    this.state = {
      currentPage: 0,
      lastRowFound: false,
      pageSize: 10,
      shownData: [],
      isRefreshing: false,
      canLoadMoreData: true,
      dataLoading: false,
      isFirstLoad: true,
      allData: [],
      userTypeId: -1
    };
    this.checkRefreshing = this.checkRefreshing.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.requestNewDatas = this.requestNewDatas.bind(this);
    this.getNewDatas = this.getNewDatas.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentWillMount(): void {
    const {navigation} = this.props;
    const userTypeId = navigation.getParam('userTypeId', null);
    this.setState({
      userTypeId
    });
  }

  abstract checkRefreshing(): void

  abstract onRefresh(): void

  abstract requestNewDatas(): void

  abstract getNewDatas(data: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>, newReq: IRequest): void

  abstract renderItems(shownData: Array<IContentPoolProcessedDetail | IContentPoolProcessedDetailMasterEditor>):Array<Element>
}

import {IListData} from "../../../common/types/ListDataType";

export interface IContentPoolResponse {
  writer: Array<IContentPoolResponseDetail>,
  editor?: Array<IContentPoolResponseDetail>,
  master_editor?: Array<IContentPoolResponseDetailMasterEditor>
}

export interface IContentPoolResponseDetail {
  content_title: string,
  deadline_seconds: number,
  id: number,
  interest_title: string,
  language_title: string,
  limit_word_lower: number,
  premium: boolean,
  price: number,
  product_title: string,
  userlevel_title: string,
  content_keywords?: string,
  status_str?: string,
  deadline?: number,
  amount?: number | string
}

export interface IContentPoolResponseDetailMasterEditor extends IContentPoolResponseDetail{
  project_title: string,
  publisher_name: string
}

export interface IContentPoolState extends IContentPoolProcessed {
  poolLoading: boolean
}

export interface IContentPoolProcessed {
  writer: Array<IContentPoolProcessedDetail> | null,
  editor: Array<IContentPoolProcessedDetail> | null,
  master_editor: Array<IContentPoolProcessedDetailMasterEditor> | null
}

export interface IContentPoolProcessedListData extends IListData {
  isHTML?: boolean
}

export interface IContentPoolProcessedDetail {
  amount?: number | string,
  content_title: string,
  deadline_seconds: number,
  id: number,
  interest_title: string,
  keywordArray?: Array<string>
  language_title: string
  limit_word_lower: number
  listData: Array<IContentPoolProcessedListData>
  premium: boolean
  price: number
  product_title: string
  userlevel_title: string
  content_description?: string
}

export interface IContentPoolProcessedDetailMasterEditor extends IContentPoolProcessedDetail {
  project_title: string,
  publisher_name: string
}



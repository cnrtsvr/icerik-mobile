import {IListData} from "../../common/types/ListDataType";

export interface IBalance {
  payments: Array<IBalancePayment>
  summary: IBalanceSummary
}

export interface IBalanceSummary {
  all: number,
  current: number
}

export interface IBalancePayment {
  amount: number,
  created_at: number,
  iban: string,
  status: number,
  status_str: string
}

export interface IBalanceProcessed {
  listData: Array<IListData>
}

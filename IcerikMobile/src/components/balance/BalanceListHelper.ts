import moment from 'moment';
import currencyService from '../../services/BalanceService';
import {IBalancePayment, IBalanceProcessed} from "./BalanceTypes";
import {IListData} from "../../common/types/ListDataType";

export function processBalanceData(balanceData: Array<IBalancePayment>): Array<IBalanceProcessed> {
  const balanceArr: Array<IBalanceProcessed> = [];
  debugger;
  if(balanceData && balanceData.length > 0) {
    balanceData.forEach((item) => {
      balanceArr.push(processBalanceItem(item));
    });
  }
  debugger;
  return balanceArr;
}

export function processBalanceItem(item: IBalancePayment): IBalanceProcessed {
  return {
    listData: createListData(item)
  }
}

function createListData(item: IBalancePayment): Array<IListData> {
  const listData: Array<IListData> = [];
  if(item.created_at) {
    listData.push({
      label: 'Ödeme Tarihi', value: moment.unix(item.created_at).format('DD.MM.YYYY hh:mm')
    });
  }
  if(item.amount) {
    listData.push({
      label: 'Tutar', value: currencyService.getCurrencyString(item.amount)
    });
  }
  if(item.iban) {
    listData.push({
      label: 'IBAN', value: item.iban
    });
  }
  if(item.status_str) {
    listData.push({
      label: 'Durum', value: item.status_str
    });
  }
  return listData;
}

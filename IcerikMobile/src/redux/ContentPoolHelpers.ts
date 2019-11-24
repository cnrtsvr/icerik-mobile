import currencyService from '../services/BalanceService';
import {
  IContentPoolResponse,
  IContentPoolResponseDetail,
  IContentPoolResponseDetailMasterEditor,
  IContentPoolProcessed,
  IContentPoolProcessedDetail,
  IContentPoolProcessedDetailMasterEditor
} from './types/content-pool';

export function processContentPoolData(data: IContentPoolResponse): IContentPoolProcessed {
  const { writer, editor, master_editor } = data;

  const writerArr = processWriterData(writer);
  let editorArr: Array<IContentPoolProcessedDetail> = [];
  if(editor) {
    editorArr = processEditorData(editor);
  }
  let masterEditorArr: Array<IContentPoolProcessedDetailMasterEditor>  = [];
  if(master_editor) {
    masterEditorArr = processMasterEditorData(master_editor);
  }
  debugger;
  return {
    writer: writerArr,
    editor: editorArr,
    master_editor: masterEditorArr,
  }
}

export function processWriterData(writer: Array<IContentPoolResponseDetail>) {
  const writerArr: Array<IContentPoolProcessedDetail> = [];
  if(writer && writer.length > 0) {
    writer.forEach((item) => {
      writerArr.push(processWriterItem(item));
    });
  }
  return writerArr;
}

export function processEditorData(editor: Array<IContentPoolResponseDetail>) {
  const editorArr: Array<IContentPoolProcessedDetail> = [];
  if(editor && editor.length > 0) {
    editor.forEach((item) => {
      editorArr.push(processEditorItem(item));
    });
  }
  return editorArr;
}

export function processMasterEditorData(master_editor: Array<IContentPoolResponseDetailMasterEditor>) {
  const masterEditorArr: Array<IContentPoolProcessedDetailMasterEditor> = [];
  if(master_editor && master_editor.length > 0) {
    master_editor.forEach((item) => {
      masterEditorArr.push(processMasterEditorItem(item));
    });
  }
  return masterEditorArr;
}

export function processWriterItem(item: IContentPoolResponseDetail): IContentPoolProcessedDetail {
  return {
    ...item,
    keywordArray: (item.content_keywords || '').split(','),
    listData: createListData(item),
    amount: currencyService.getCurrencyString(item.price ? item.price / 100 : 0)
  };
}

export function processEditorItem(item: IContentPoolResponseDetail): IContentPoolProcessedDetail {
  return {
    ...item,
    keywordArray: (item.content_keywords || '').split(','),
    listData: createListData(item),
    amount: currencyService.getCurrencyString(item.price ? item.price / 100 : 0)
  }
}

export function processMasterEditorItem(item: IContentPoolResponseDetailMasterEditor): IContentPoolProcessedDetailMasterEditor {
  return {
    ...item,
    listData: createListData(item),
  }
}

function createListData(item: IContentPoolResponseDetail | IContentPoolResponseDetailMasterEditor) {
  const listData = [];
  const processItem = item as IContentPoolResponseDetailMasterEditor;
  if(processItem.publisher_name) {
    listData.push({
      label: 'Yayıncı', value: processItem.publisher_name
    });
  }
  if(processItem.limit_word_lower) {
    listData.push({
      label: 'Min. Kelime', value: processItem.limit_word_lower
    });
  }
  if(processItem.deadline_seconds || item.deadline) {
    listData.push({
      label: 'Teslim Süresi', value: ((processItem.deadline_seconds ? processItem.deadline_seconds : (processItem.deadline || 0)) / 3600) + ' Saat'
    });
  }
  if(processItem.userlevel_title) {
    listData.push({
      label: 'Yazar Seviyesi', value: processItem.userlevel_title
    });
  }
  if(processItem.interest_title) {
    listData.push({
      label: 'İlgi Alanı', value: processItem.interest_title
    });
  }
  if(processItem.product_title) {
    listData.push({
      label: 'İçerik Türü', value: processItem.product_title
    });
  }
  if(processItem.status_str) {
    listData.push({
      label: 'Durum', value: processItem.status_str, isHTML: true
    });
  }
  return listData;
}

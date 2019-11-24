import {
  CLEAR_CONTENT_POOL,
  FETCH_POOL_FAILED,
  FETCH_POOL_STARTED,
  FETCH_POOL_SUCCEEDED,
  IContentPoolActionTypes,
  IContentPoolState
} from './types/content-pool';
import { processContentPoolData } from "./ContentPoolHelpers";

const INITIAL_STATE: IContentPoolState = {
  writer: null,
  editor: null,
  master_editor: null,
  poolLoading: false
};

function contentPoolReducer(state = INITIAL_STATE, action: IContentPoolActionTypes) {
  switch (action.type) {
    case FETCH_POOL_STARTED:
      return {...state, poolLoading: true};
    case FETCH_POOL_SUCCEEDED:
      const newPoolState = processContentPoolData(action.payload);
      return {...state, ...newPoolState, poolLoading: false};
    case FETCH_POOL_FAILED:
      return {...state, poolLoading: false};
    case CLEAR_CONTENT_POOL:
      return {...INITIAL_STATE };
    default:
      return state
  }
}

export default contentPoolReducer;

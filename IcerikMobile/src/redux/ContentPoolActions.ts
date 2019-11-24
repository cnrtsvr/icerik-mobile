import {
  CLEAR_CONTENT_POOL,
  FETCH_POOL_FAILED,
  FETCH_POOL_STARTED,
  FETCH_POOL_SUCCEEDED,
  IContentPoolResponse,
  IContentPoolActionTypes
} from './types/content-pool';
import axios from "../axios";
import {AxiosError, AxiosResponse} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {Action} from "redux";

export function fetchContentPool(): ThunkAction<void, {}, null, Action<string>> {
  return dispatch => {
    dispatch(fetchContentPoolStarted());

    axios.get('v1/contentpool/list')
        .then((response: AxiosResponse<IContentPoolResponse>) => {
          const {data} = response;
          dispatch(fetchContentPoolSuccess(data))
        })
        .catch((e: AxiosError<IContentPoolResponse>) => {
          dispatch(fetchContentPoolFailed(e))
        });
  };
}

function fetchContentPoolStarted(): IContentPoolActionTypes {
  return {
    type: FETCH_POOL_STARTED
  }
}

function fetchContentPoolSuccess(pool: IContentPoolResponse): IContentPoolActionTypes {
  return {
    type: FETCH_POOL_SUCCEEDED,
    payload: pool
  }
}

function fetchContentPoolFailed(error: any) {
  return {
    type: FETCH_POOL_FAILED
  }
}

export function clearContentPool() {
  return {
    type: CLEAR_CONTENT_POOL
  }
}

import { IContentPoolResponse } from "./ContentPoolTypes";

export const FETCH_POOL_STARTED = 'FETCH_POOL_STARTED';
export const FETCH_POOL_SUCCEEDED = 'FETCH_POOL_SUCCEEDED';
export const FETCH_POOL_FAILED = 'FETCH_POOL_FAILED';
export const CLEAR_CONTENT_POOL = 'CLEAR_CONTENT_POOL';

interface IFetchContentPoolStartedAction {
  type: typeof FETCH_POOL_STARTED
}

interface IFetchContentPoolSuccessAction {
  type: typeof FETCH_POOL_SUCCEEDED,
  payload: IContentPoolResponse
}

interface IFetchContentPoolFailedAction {
  type: typeof FETCH_POOL_FAILED
}

interface IClearContentPoolAction {
  type: typeof CLEAR_CONTENT_POOL
}

export type IContentPoolActionTypes =
  IFetchContentPoolStartedAction
  | IFetchContentPoolSuccessAction
  | IFetchContentPoolFailedAction
  | IClearContentPoolAction

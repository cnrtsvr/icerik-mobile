import {applyMiddleware, createStore, Store} from 'redux';
import rootReducer, {AppState} from '../../src/redux/RootReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

// @ts-ignore
const pReducer = persistReducer(persistConfig, rootReducer);

const ReduxStore = createStore(pReducer, undefined, applyMiddleware(thunk));

export const persistor = persistStore(ReduxStore);

export default ReduxStore;

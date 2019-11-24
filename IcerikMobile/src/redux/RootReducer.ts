import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import contentPoolReducer from './ContentPoolReducer';

const rootReducer = combineReducers({
  user: userReducer,
  contentPool: contentPoolReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>

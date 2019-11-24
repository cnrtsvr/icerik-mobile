import React from 'react';
import AppNavigator from './src/components/core/AppNavigator';
import { Provider } from 'react-redux';
import ReduxStore, { persistor } from './src/redux/StoreInstance';
import { PersistGate } from 'redux-persist/lib/integration/react';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
        <Provider store={ ReduxStore }>
          <PersistGate persistor={ persistor } loading={null}>
            <AppNavigator/>
          </PersistGate>
        </Provider>
    );
  }
}

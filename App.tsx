import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  const {store, persistor} = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

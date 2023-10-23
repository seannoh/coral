import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useRedux from './redux/useRedux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

export default function App() {
  const {store, persistor} = useRedux();
  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          {/* <PutNavigatorComponentHere /> */}
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

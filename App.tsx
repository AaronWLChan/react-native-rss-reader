import React from 'react';
import { Provider } from 'react-redux';
import PersistedStore from './redux/store'
import Navigation from './navigation'
import { PersistGate } from 'redux-persist/integration/react';

//TODO THEMING ANDROID
//Switch and buttons look hella nasty on Android
//Convert all headerRight to Touchable Opacity with text instead same color as accent though
export default function App() {

  const { store, persistor } = PersistedStore()

  return (

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
    
    </Provider>
   
  );
}


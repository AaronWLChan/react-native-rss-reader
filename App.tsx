import React from 'react';
import { Provider } from 'react-redux';
import PersistedStore from './redux/store'
import Navigation from './navigation'
import { PersistGate } from 'redux-persist/integration/react';


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


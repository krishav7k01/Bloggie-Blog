import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom';
import {  store , persistor} from './redux/store.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
    <Router>
    <ScrollToTop/>
    <App />
    </Router>
    </ThemeProvider>
    </Provider>
    </PersistGate>
  
)

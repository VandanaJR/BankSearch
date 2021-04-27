import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react'

//STORE IMPORTS
import {Provider} from 'react-redux'
import store from './state/store'
import {persistor} from './state/store'

import {createMuiTheme,ThemeProvider} from '@material-ui/core/styles'


const theme = createMuiTheme({
 palette: {
    type: 'dark',
  },
})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


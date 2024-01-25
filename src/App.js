import React from 'react'
import Herox from './pages/Herox'
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Herox />
    </Provider>
  )
}

export default App
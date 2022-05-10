import { HashRouter } from 'react-router-dom'

import System from '@/system'
import './style/init.css'

import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <System />
      </Provider>
    </HashRouter>
  )
}

export default App

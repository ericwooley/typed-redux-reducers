import * as React from 'react'
import { render } from 'react-dom'
import Counter from './counter'
import store from './redux/store'
import { Provider } from 'react-redux'
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

const App = () => (
  <Provider store={store}>
    <div style={styles}>
      <Counter />
    </div>
  </Provider>
)

render(<App />, document.getElementById('root'))

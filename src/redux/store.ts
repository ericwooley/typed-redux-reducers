import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import counter, { ICounterState } from './counter/reducer'
import thunk from 'redux-thunk'
export interface IState {
  counter: ICounterState
}
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  combineReducers({
    counter
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
export default store

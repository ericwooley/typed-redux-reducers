# typed-redux-reducers

A few defitions and helper functions to help make your reducers and action
creators type safe.

## Installtion

`npm install typed-redux-reducers` or `yarn typed-redux-reducers`

## usage

```ts
// Counter reducer
import { IAction, actionFactory, createReducer } from 'typed-redux-reducers'
enum CounterTypes {
  INCREMENT = 'COUNTER/INCREMENT',
  ASYNC_INCREMENT = 'COUNTER/ASYNC_INCREMENT',
  DECREMENT = 'COUNTER/DECREMENT'
}
interface IState {
  count: number
}
export const actionBundles = {
  increment: actionFactory<IState, number>(
    CounterTypes.INCREMENT,
    (state: IState, action: IAction<number>) => ({
      ...state,
      count: state.count + action.payload
    })
  ),
  decrement: actionFactory<IState, number>(
    CounterTypes.DECREMENT,
    (state: IState, action: IAction<number>) => ({
      ...state,
      count: state.count - action.payload
    })
  ),
  asyncIncrement: actionFactory<IState, number>(
    CounterTypes.ASYNC_INCREMENT,
    (state: IState, action: IAction<number>) => ({
      ...state,
      count: state.count + action.payload
    }),
    // Thunk support
    (count: number = 2) => (dispatch: any, getState: any) =>
      new Promise<IAction<number>>(resolve =>
        setTimeout(
          () =>
            resolve(
              dispatch({ type: CounterTypes.ASYNC_INCREMENT, payload: count })
            ),
          1000
        )
      )
  )
}
export const actionCreators = {
  increment: actionBundles.increment.actionCreator,
  decrement: actionBundles.decrement.actionCreator,
  asyncIncrement: actionBundles.asyncIncrement.actionCreator
}

export interface ICounterState {
  count: number
}
const defaultState: ICounterState = {
  count: 0
}

export default createReducer(defaultState, actionBundles)
```

In your store

```ts
import counter, { ICounterState } from './counter/reducer'
import thunk from 'redux-thunk'
export interface IState {
  counter: ICounterState
}
let store = createStore(
  combineReducers({
    counter
  }),
  applyMiddleware(thunk)
)
export default store
```

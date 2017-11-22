import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from './redux/store'
import selectors from './redux/selectors'
import actions from './redux/actions'
interface Props {
  count: number
  increment: (c: number) => any
  decrement: (c: number) => any
  asyncIncrement: (c?: number) => any
}

const Inc = (props: Props) => (
  <div>
    {props.count}
    <br />
    <button onClick={() => props.decrement(1)}>-1</button>
    <button onClick={() => props.increment(1)}>+1</button>
    <br />
    <button onClick={() => props.asyncIncrement(2)}>+2 thunk support</button>
  </div>
)
export default connect(
  (state: IState) => ({
    count: selectors.counter.count(state)
  }),
  {
    increment: actions.counter.increment,
    decrement: actions.counter.decrement,
    asyncIncrement: actions.counter.asyncIncrement
  }
)(Inc)

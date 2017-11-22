import { createReducer } from '../../reducerTypes'
import { actionBundles } from './actions'
export interface ICounterState {
  count: number
}
const defaultState: ICounterState = {
  count: 0
}

export default createReducer(defaultState, actionBundles)

import { ICounterState } from './reducer'
type IStateWithCounter = {
    counter: ICounterState
}
const count = (state: IStateWithCounter) => state.counter.count
export default {
    count
}

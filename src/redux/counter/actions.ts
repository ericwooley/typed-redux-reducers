import { IAction, actionFactory } from '../../reducerTypes'
enum CounterTypes {
  INCREMENT = 'COUNTER/INCREMENT',
  ASYNC_INCREMENT = 'COUNTER/ASYNC_INCREMENT',
  DECREMENT = 'COUNTER/DECREMENT'
}
interface IState {
  count: number
}
export const actionBundles = {
    increment: actionFactory<IState, number>(CounterTypes.INCREMENT, (state: IState, action: IAction<number>) => ({
        ...state,
        count: state.count + action.payload
    })),
    decrement: actionFactory<IState, number>(CounterTypes.DECREMENT, (state: IState, action: IAction<number>) => ({
        ...state,
        count: state.count - action.payload
    })),
}
export const actionCreators = {
  increment: actionBundles.increment.actionCreator,
  decrement: actionBundles.decrement.actionCreator,
  asyncIncrement: (count: number = 2) =>
          (dispatch: any, getState: any) =>
          new Promise<IAction<number>>((resolve) =>
              setTimeout(
                  () => resolve(dispatch(actionCreators.increment(count))),
                  1000
              )
          )
}

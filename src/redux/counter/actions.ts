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
    asyncIncrement: actionFactory<IState, number>(
        CounterTypes.ASYNC_INCREMENT,
        (state: IState, action: IAction<number>) => ({
            ...state,
            count: state.count + action.payload
        }),
        // Thunk support
        (count: number = 2) =>
            (dispatch: any, getState: any) =>
            new Promise<IAction<number>>((resolve) =>
                setTimeout(
                    () => resolve(dispatch({type: CounterTypes.ASYNC_INCREMENT, payload: count})),
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

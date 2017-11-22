export interface IAction<T = undefined> {
  type: string
  payload: T
}
export type ActionHandler<S, T> = (state: S, action: IAction<T>) => S
export type ActionBundle<S, T> = {
  type: string
  actionCreator: (payload: T) => IAction<T> | (() => Promise<IAction<T>>)
  handler: ActionHandler<S, T>
}
export function actionFactory<S, T>(
  type: string,
  handler: (state: S, action: IAction<T>) => S,
  customActionCreator?: () => (...arg: any[]) => Promise<IAction<T>>
): ActionBundle<S, T> {
  return {
    type,
    actionCreator: customActionCreator
      ? customActionCreator
      : (payload: T) => ({ type, payload }),
    handler
  }
}

function actionHandlerFactory<S>(...actionBundles: ActionBundle<S, any>[]) {
  return actionBundles.reduce(
    (handlers, ab) => ({
      ...handlers,
      [ab.type]: ab.handler
    }),
    {} as { [key: string]: ActionHandler<S, any> }
  )
}

export function createReducer<S>(
  initialState: S,
  actionBundles: { [key: string]: ActionBundle<S, any> }
) {
  const actionHandlers = actionHandlerFactory(...Object.values(actionBundles))
  return (state = initialState, action: IAction) => {
    if (actionHandlers[action.type]) {
      return actionHandlers[action.type](state, action)
    }
    return state
  }
}

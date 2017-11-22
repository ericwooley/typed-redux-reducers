export interface IAction<T = undefined> {
    type: string;
    payload: T;
}
export declare type ActionHandler<S, T> = (state: S, action: IAction<T>) => S;
export declare type ActionBundle<S, T> = {
    type: string;
    actionCreator: (payload: T) => IAction<T> | (() => Promise<IAction<T>>);
    handler: ActionHandler<S, T>;
};
export declare function actionFactory<S, T>(type: string, handler: (state: S, action: IAction<T>) => S, customActionCreator?: () => (...arg: any[]) => Promise<IAction<T>>): ActionBundle<S, T>;
export declare function createReducer<S>(initialState: S, actionBundles: {
    [key: string]: ActionBundle<S, any>;
}): (state: S | undefined, action: IAction<undefined>) => S;

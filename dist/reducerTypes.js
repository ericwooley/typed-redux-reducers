var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function actionFactory(type, handler, customActionCreator) {
        return {
            type: type,
            actionCreator: customActionCreator
                ? customActionCreator
                : function (payload) { return ({ type: type, payload: payload }); },
            handler: handler
        };
    }
    exports.actionFactory = actionFactory;
    function actionHandlerFactory() {
        var actionBundles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionBundles[_i] = arguments[_i];
        }
        return actionBundles.reduce(function (handlers, ab) {
            return (__assign({}, handlers, (_a = {}, _a[ab.type] = ab.handler, _a)));
            var _a;
        }, {});
    }
    function createReducer(initialState, actionBundles) {
        var actionHandlers = actionHandlerFactory.apply(void 0, Object.values(actionBundles));
        return function (state, action) {
            if (state === void 0) { state = initialState; }
            if (actionHandlers[action.type]) {
                return actionHandlers[action.type](state, action);
            }
            return state;
        };
    }
    exports.createReducer = createReducer;
});
//# sourceMappingURL=reducerTypes.js.map
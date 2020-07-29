import _ from "lodash/fp";
import { createStore, Store, combineReducers, PreloadedState } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import ducks from "./reducers";
import { Actions, State } from "./types";

const getReducersFromDucks = _.pipe([
    _.values,
    _.reduce((result, { MOUNT_POINT, reducer }) => Object.assign(result, { [MOUNT_POINT]: reducer }), {}),
]);

const reducers = getReducersFromDucks(ducks);

const rootReducer = combineReducers(reducers);

const configureStore = (preloadedState?: PreloadedState<State>): Store<State, Actions> =>
    createStore(
        rootReducer,
        preloadedState,
        devToolsEnhancer({
            trace: true,
            traceLimit: 200,
        })
    );

export default configureStore;

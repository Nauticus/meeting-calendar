import _ from "lodash/fp";
import { createStore, Store, combineReducers, PreloadedState } from "redux";

import ducks from "./reducers";
import { Actions, State } from './types';

const getReducersFromDucks = _.pipe(
    _.values,
    _.reduce((result, { MOUNT_POINT, reducer }) => Object.assign(result, { [MOUNT_POINT]: reducer }), {})
);

const configureStore = (preloadedState?: PreloadedState<State>): Store<State, Actions> => {
    const reducers = getReducersFromDucks(ducks);
    const rootReducer = combineReducers(reducers);

    return createStore(
        rootReducer,
        preloadedState,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;

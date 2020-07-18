import { Record } from "immutable";
import { createSelector } from "reselect";
import { startOfMonth } from "date-fns";

import { MOUNT_POINT, EVENTS, MEETING_ROOMS, CURRENT_DATE, ADD_EVENT, SET_CURRENT_DATE } from "./Calendar.constants";
import { State as GlobalState } from "app/store/types";
import { State, ActionTypes, AddEventAction, Event, SetCurrentDateAction } from "./Calendar.types";

const initialState = Record<State>({
    [EVENTS]: [],
    [MEETING_ROOMS]: [],
    [CURRENT_DATE]: startOfMonth(new Date()),
});

const reducer = (state = initialState(), { type, payload }: ActionTypes): ReturnType<typeof initialState> => {
    switch (type) {
        case ADD_EVENT:
            return state.update(EVENTS, (events) => [...events, payload as Event]);
        case SET_CURRENT_DATE:
            return state.set(CURRENT_DATE, payload as Date);
        default:
            return state;
    }
};

const actionCreators = {
    addEvent: (payload: Event): AddEventAction => ({
        type: ADD_EVENT,
        payload,
    }),
    setCurrentDate: (payload: Date): SetCurrentDateAction => ({
        type: SET_CURRENT_DATE,
        payload,
    }),
};

const selectMountPoint = (state: GlobalState) => state[MOUNT_POINT];

const selectors = {
    events: createSelector(selectMountPoint, (state) => state[EVENTS]),
    currentDate: createSelector(selectMountPoint, (state) => state[CURRENT_DATE]),
};

export { MOUNT_POINT as default, MOUNT_POINT, actionCreators, selectors, reducer };

import { EVENTS, ADD_EVENT, MEETING_ROOMS, CURRENT_DATE, SET_CURRENT_DATE } from "./Calendar.constants";

export { MOUNT_POINT } from "./Calendar.constants";

export interface Event {
    start: Date;
    end: Date;
    name: string;
    meetingRoom: string;
    participants: [];
}

export interface AddEventAction {
    type: typeof ADD_EVENT;
    payload: Event;
}

export interface SetCurrentDateAction {
    type: typeof SET_CURRENT_DATE;
    payload: Date;
}

export interface State {
    [EVENTS]: Event[];
    [MEETING_ROOMS]: string[];
    [CURRENT_DATE]: Date;
}

export type ActionTypes = AddEventAction | SetCurrentDateAction;

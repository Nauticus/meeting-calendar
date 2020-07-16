import * as CalendarTypes from "app/compositions/calendar/Calendar.types";

export type Actions = CalendarTypes.ActionTypes;

export type State = {
    [CalendarTypes.MOUNT_POINT]: CalendarTypes.State;
};

// Since this is a mock of an API response I'm skipping decoding step.

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Record } from "immutable";
import { parseISO, startOfMonth } from "date-fns";
import {
    MOUNT_POINT as CALENDAR_MOUNT_POINT,
    EVENTS,
    MEETING_ROOMS,
    CURRENT_DATE,
} from "app/compositions/calendar/Calendar.constants";
import { State } from "app/compositions/calendar/Calendar.types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normalize = (data: any): any => ({
    [CALENDAR_MOUNT_POINT]: Record<State>({
        [EVENTS]: data.meetings.map((meeting: any) => ({
            start: parseISO(meeting.start),
            end: parseISO(meeting.end),
            name: meeting.name,
            meetingRoom: meeting.meetingRoom,
        })),
        [MEETING_ROOMS]: data.meetingRooms,
        [CURRENT_DATE]: startOfMonth(new Date()),
    })(),
});

export { normalize as default };

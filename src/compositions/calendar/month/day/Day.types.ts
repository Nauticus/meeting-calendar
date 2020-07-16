import { Event } from "app/compositions/calendar/Calendar.types";

export interface DayProps {
    day: Date;
    currentDate?: Date;
    eventsInCurrentMonth?: Event[];
    addEvent?: (event: Event) => void;
}

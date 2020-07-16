import { Event } from 'app/compositions/calendar/Calendar.types';

export interface EventsDialogProps {
    isOpen: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    events: Event[];
}

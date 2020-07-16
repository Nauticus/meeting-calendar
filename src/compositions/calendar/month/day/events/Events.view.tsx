import * as React from "react";
import _ from "lodash/fp";
import { format, isSameDay, compareAsc } from "date-fns";
import { Card, Divider, Typography } from "@material-ui/core";

import { Event } from "app/compositions/calendar/Calendar.types";

import useStyles from "./Events.styles";
import EventsDialog from "./eventsDialog";

export interface EventsProps {
    day: Date;
    eventsInCurrentMonth: Event[];
}

const Events: React.FunctionComponent<EventsProps> = ({ eventsInCurrentMonth, day }: EventsProps) => {
    const [events, setEvents] = React.useState([]);
    const [isDialogOpen, setDialogState] = React.useState<boolean>(false);
    const classes = useStyles();

    const onOpenDialog = () => {
        setDialogState(true);
    };

    const onCloseDialog = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setDialogState(false);
    };

    React.useEffect(() => {
        const filterEvents = _.filter((event: Event) => isSameDay(event.start, day));
        setEvents(filterEvents(eventsInCurrentMonth).sort((a, b) => compareAsc(a.start, b.start)));
    }, [eventsInCurrentMonth, day]);

    return (
        <div onClick={onOpenDialog} className={classes.Events}>
            {_.pipe([
                _.take(3),
                _.map((event: Event) => (
                    <Card
                        key={`${format(event.start, "d-hh-mm")}-${event.name}`}
                        className={classes.Event}
                        variant="outlined"
                    >
                        <Typography variant="caption">{`${format(event.start, "hh:mm a")} - ${format(
                            event.end,
                            "hh:mm a"
                        )}`}</Typography>
                        <Divider />
                        <Typography variant="subtitle2">{event.name}</Typography>
                    </Card>
                )),
            ])(events)}
            <EventsDialog events={events} isOpen={isDialogOpen} onClose={onCloseDialog} />
        </div>
    );
};

export { Events as default };

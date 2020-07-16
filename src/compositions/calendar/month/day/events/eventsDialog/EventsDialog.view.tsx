import * as React from "react";
import { format } from "date-fns";
import Alert from "@material-ui/lab/Alert";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";

import { EventsDialogProps } from "./EventsDialog.types";

const EventsDialog: React.FunctionComponent<EventsDialogProps> = ({ isOpen, onClose, events }: EventsDialogProps) => {

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            onBackdropClick={onClose}
            open={isOpen}
        >
            <DialogTitle id="customized-dialog-title" disableTypography>
                <Typography variant="h5">{"Daily Events"}</Typography>
            </DialogTitle>
            <DialogContent>
                {/** TODO: Move the list to a separate component to reduce complexity */}
                {events.length ? (
                    events.map((event, index) => (
                        <List key={index}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6">{event.name}</Typography>
                                    <Typography variant="body1">{event.meetingRoom}</Typography>
                                    <Typography variant="body1">{`${format(event.start, "hh:mm a")} - ${format(
                                        event.end,
                                        "hh:mm a"
                                    )}`}</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    ))
                ) : (
                    <Alert severity="info">{"There are not events for this day."}</Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{"Close"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export { EventsDialog as default };

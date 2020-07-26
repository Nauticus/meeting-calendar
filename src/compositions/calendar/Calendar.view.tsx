import * as React from "react";
import { Typography } from "@material-ui/core";

import useStyles from "./Calendar.styles";
import Navigation from "./navigation";
import Month from "./month";

const Calendar: React.FunctionComponent<void> = () => {
    const classes = useStyles();

    return (
        <div className={classes.Wrapper}>
            <Typography gutterBottom variant="h4">
                {"Meeting Calendar"}
            </Typography>
            <Navigation />
            <Month />
        </div>
    );
};

export default Calendar;

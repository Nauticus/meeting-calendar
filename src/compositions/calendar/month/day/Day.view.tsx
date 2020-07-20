import * as React from "react";
import { format, isSameMonth } from "date-fns";
import cx from "classnames";
import { Typography } from "@material-ui/core";

import { DayProps } from "./Day.types";
import useStyles from "./Day.styles";
import Events from "./events";

const Day: React.FunctionComponent<DayProps> = ({ day, currentDate }: DayProps) => {
    const classes = useStyles();

    return (
        <div className={classes.DayWrapper}>
            <Typography
                display="block"
                align="right"
                gutterBottom
                variant="button"
                className={cx(classes.DayLabel, { [classes.InactiveDayLabel]: !isSameMonth(currentDate, day) })}
            >
                {format(day, "d")}
            </Typography>
            <Events day={day} />
        </div>
    );
};

export { Day as default };

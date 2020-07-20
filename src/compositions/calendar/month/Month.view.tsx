import * as React from "react";
import { eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth } from "date-fns";
import _ from "lodash";
import { Typography } from "@material-ui/core";

import { useTheme } from "app/theming";

import Day from "./day";
import useStyles from "./Month.styles";
import { MonthProps } from "./Month.types";
import { WEEK_DAYS } from "./Month.constants";

const Month: React.FunctionComponent<MonthProps> = ({ currentDate }: MonthProps) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [daysInMonth, setDaysInMonth] = React.useState<Date[]>([]);

    React.useEffect(() => {
        const daysOfMonth = eachDayOfInterval({
            start: startOfWeek(currentDate, { weekStartsOn: 1 }),
            end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
        });

        setDaysInMonth(daysOfMonth);
    }, [currentDate]);

    return (
        <div className={classes.TableWrapper}>
            <div className={classes.GridContainer}>
                {WEEK_DAYS.map((day, index) => (
                    <div className={classes.GridHeader} key={index}>
                        <Typography gutterBottom variant="button">
                            {day}
                        </Typography>
                    </div>
                ))}
                {daysInMonth.map((day, key) => (
                    <Day key={key} day={day} />
                ))}
            </div>
        </div>
    );
};

export { Month as default };

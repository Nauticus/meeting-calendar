import * as React from "react";
import { eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth } from "date-fns";
import _ from "lodash";
import {Typography} from "@material-ui/core";

import { useTheme } from "app/theming";

import Day from "./day";
import useStyles from "./Month.styles";
import { MonthProps } from "./Month.types";
import { WEEK_DAYS } from "./Month.constants";

const Month: React.FunctionComponent<MonthProps> = ({ currentDate }: MonthProps) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [daysInMonthChunks, setDaysInMonthChunks] = React.useState<Date[][]>([]);

    React.useEffect(() => {
        const daysOfMonth = eachDayOfInterval({
            start: startOfWeek(currentDate, { weekStartsOn: 1 }),
            end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
        });

        setDaysInMonthChunks(_.chunk(daysOfMonth, 7));
    }, [currentDate]);
    return (
        <div className={classes.TableWrapper}>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {WEEK_DAYS.map((day, index) => (
                            <th key={index}><Typography gutterBottom variant="button">{day}</Typography></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {daysInMonthChunks.map((daysInWeek, key) => (
                        <tr key={key}>
                            {daysInWeek.map((day, dayKey) => (
                                <Day key={dayKey} day={day} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { Month as default };

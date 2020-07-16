import * as React from "react";
import { addMonths, subMonths, startOfMonth, format } from "date-fns";
import { Button, ButtonGroup, Typography } from "@material-ui/core";

import useStyles from "./Navigation.styles";
import { NavigationProps } from "./Navigation.types";

const Navigation: React.FunctionComponent<NavigationProps> = ({ setCurrentDate, currentDate }: NavigationProps) => {
    const classes = useStyles();

    const onPreviousHandler = React.useCallback(() => {
        setCurrentDate(subMonths(currentDate, 1));
    }, [setCurrentDate, currentDate]);

    const onNextHandler = React.useCallback(() => {
        setCurrentDate(addMonths(currentDate, 1));
    }, [setCurrentDate, currentDate]);

    const onTodayHandler = React.useCallback(() => {
        setCurrentDate(startOfMonth(new Date()));
    }, [setCurrentDate]);

    return (
        <div className={classes.NavigationWrapper}>
            <div className={classes.Navigation}>
                <ButtonGroup className={classes.NavigationButtonGroup}>
                    <Button color="primary" variant="outlined" onClick={onPreviousHandler}>
                        {"Previous"}
                    </Button>
                    <Button disableRipple onClick={onTodayHandler} variant="contained" color="primary">
                        {"Today"}
                    </Button>
                    <Button color="primary" variant="outlined" onClick={onNextHandler}>
                        {"Next"}
                    </Button>
                </ButtonGroup>
            </div>
            <Typography variant='h5'>{format(currentDate, "MMMM yyyy")}</Typography>
        </div>
    );
};

export { Navigation as default };

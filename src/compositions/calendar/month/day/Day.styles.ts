import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    DayWrapper: {
        height: "100%",
        boxSizing: "border-box",
        cursor: 'pointer'
    },
    DayLabel: {},
    InactiveDayLabel: {
        opacity: "0.3",
    },
});

export { useStyles as default };

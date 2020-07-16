import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    DayWrapper: {
        display: "flex",
        position: "relative",
        height: "100%",
    },
    DayLabel: {
        position: "absolute",
        top: "10px",
        right: "10px",
    },
    InactiveDayLabel: {
        opacity: "0.3",
    },
});

export { useStyles as default };

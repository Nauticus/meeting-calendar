import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    DayWrapper: {
        position: "relative",
        height: "100%",
        padding: "40px 5px 5px",
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

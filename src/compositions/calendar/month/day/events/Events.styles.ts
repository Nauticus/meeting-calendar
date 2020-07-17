import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    Events: {
        height: '100%'
    },
    Event: {
        padding: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem",
    },
    EventTime: {
        marginBottom: "5px",
    },
    EventName: {
        fontWeight: "bold",
        padding: "5px 0",
    },
});

export { useStyles as default };

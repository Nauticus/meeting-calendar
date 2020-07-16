import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    Events: {
        flexGrow: 1,
        marginTop: "30px",
        padding: "5px",
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

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    "@global": {
        body: {
            margin: 0,
            minHeight: "100vh",
        },
    },
    Wrapper: {
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
});

export default useStyles;

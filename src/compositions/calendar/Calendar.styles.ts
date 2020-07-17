import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    "@global": {
        body: {
            margin: 0,
            minHeight: "100%",
        },
        html: {
            height: "100vh",
        },
        "#root": {
            height: "100%",
        },
    },
    Wrapper: {
        height: "100%",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
});

export default useStyles;

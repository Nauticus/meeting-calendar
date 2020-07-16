import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    "@global": {
        body: {
            margin: 0,
        },
    },
    Wrapper: {
        padding: "0 20px",
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
});

export default useStyles;

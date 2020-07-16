import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    NavigationWrapper: {
        display: "flex",
        marginTop: "10px",
        marginBottom: "20px",
    },
    NavigationButtonGroup: {
        marginRight: "10px",
    },
    Navigation: {
        flexGrow: 1,
    },
});

export default useStyles;

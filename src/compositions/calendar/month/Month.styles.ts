import { createUseStyles } from "react-jss";
import theming, { ThemeType } from "app/theming";

const useStyles = createUseStyles(
    {
        TableWrapper: {
            flexGrow: 1,
            marginBottom: "20px",
        },
        Table: {
            tableLayout: "fixed",
            borderCollapse: "collapse",
            height: "100%",
            width: "100%",
            "& td": {
                border: ({ theme }: { theme: ThemeType }) => `1px Solid ${theme.primaryColorLight}`,
                cursor: "pointer",
                "&:hover": {
                    background: ({ theme }: { theme: ThemeType }) => theme.primaryColorLight,
                },
            },
        },
    },
    { theming }
);

export { useStyles as default };

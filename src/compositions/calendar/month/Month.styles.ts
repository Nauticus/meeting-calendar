import { createUseStyles } from "react-jss";
import theming, { ThemeType } from "app/theming";

const useStyles = createUseStyles(
    {
        GridContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "40px auto",
            gridGap: "10px",
            flexGrow: 1,
        },
        GridHeader: {
            justifySelf: "end",
        },
        TableWrapper: {
            display: "flex",
            flexGrow: 1,
        },
        TableHeader: {
            height: "50px",
        },
        Table: {
            tableLayout: "fixed",
            borderCollapse: "collapse",
            height: "100%",
            width: "100%",
            "& td": {
                border: ({ theme }: { theme: ThemeType }) => `1px Solid ${theme.primaryColorLight}`,
                cursor: "pointer",
                verticalAlign: "top",
                "&:hover": {
                    background: ({ theme }: { theme: ThemeType }) => theme.primaryColorLight,
                },
            },
        },
    },
    { theming }
);

export { useStyles as default };

import * as React from "react";
import { createTheming } from "react-jss";

import theme from "./defaultTheme";

type ThemeType = typeof theme;

const ThemeContext = React.createContext(theme);

const theming = createTheming<ThemeType>(ThemeContext);

const { ThemeProvider, useTheme } = theming;

export { theming as default, ThemeProvider, useTheme, theme, ThemeType };

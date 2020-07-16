import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import configureStore from "app/store/createStore";
import Calendar from "app/compositions/calendar";
import { ThemeProvider, theme } from "./theming";
import data from './data.json';
import normalize from './normalize';

const normalizedData = normalize(data);

const store = configureStore(normalizedData);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Calendar />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

import React from "react";
import { startOfMonth, format, addMonths, subMonths, setHours } from "date-fns";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";

import { ThemeProvider, theme } from "app/theming";
import configureStore from "app/store/createStore";

import Calendar from "../Calendar.main";
import * as CalendarDuck from "../Calendar.state";
import { Event } from "../Calendar.types";

type StoreReturnType = ReturnType<typeof configureStore>;

const getProviderWrapper = (store: StoreReturnType) => ({ children }: { children: React.ReactChildren }) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
);

const createEvents = (store: StoreReturnType, events: Event[]): void =>
    events.forEach((event) => {
        store.dispatch(CalendarDuck.actionCreators.addEvent(event));
    });

const originalConsoleError = console.error;

describe("Calendar", () => {
    let store: StoreReturnType;
    let currentDate: Date;

    beforeEach(() => {
        console.error = jest.fn();
        store = configureStore();
        currentDate = startOfMonth(new Date());
        store.dispatch(CalendarDuck.actionCreators.setCurrentDate(currentDate));
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    test("should display current month and year", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });

        expect(getByTestId("currentMonthAndYear").textContent).toBe(format(currentDate, "MMMM yyyy"));
    });
    test("should navigate to next month", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const nextButton = getByTestId("nextButton");

        fireEvent.click(nextButton);

        expect(getByTestId("currentMonthAndYear").textContent).toBe(format(addMonths(currentDate, 1), "MMMM yyyy"));
    });
    test("should naviate to current month", () => {
        store.dispatch(CalendarDuck.actionCreators.setCurrentDate(subMonths(currentDate, 2)));
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const todayButton = getByTestId("todayButton");

        fireEvent.click(todayButton);

        expect(getByTestId("currentMonthAndYear").textContent).toBe(format(currentDate, "MMMM yyyy"));
    });
    test("should naviate to previous month", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const previousButton = getByTestId("previousButton");

        fireEvent.click(previousButton);

        expect(getByTestId("currentMonthAndYear").textContent).toBe(format(subMonths(currentDate, 1), "MMMM yyyy"));
    });
    test.skip("should show at least 3 events in single day", () => {
        const currentTime = new Date();
        createEvents(store, [
            {
                name: "Event 1",
                start: setHours(currentTime, 2),
                end: setHours(currentTime, 3),
                meetingRoom: "Arbanasi",
                participants: [],
            },
            {
                name: "Event 2",
                start: setHours(currentTime, 3),
                end: setHours(currentTime, 4),
                meetingRoom: "Arbanasi",
                participants: [],
            },
            {
                name: "Event 3",
                start: setHours(currentTime, 4),
                end: setHours(currentTime, 5),
                meetingRoom: "Arbanasi",
                participants: [],
            },
            {
                name: "Event 4",
                start: setHours(currentTime, 5),
                end: setHours(currentTime, 6),
                meetingRoom: "Arbanasi",
                participants: [],
            },
        ]);

        const { debug, getByTestId, queryAllByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });

        console.log(queryAllByTestId("gridEvent"));
        // debug(getByTestId("calendarGrid"), 10000);
    });
    test.skip("should click on a day and show overlay", () => {});
    test.skip("should show all events in a given day", () => {});
});

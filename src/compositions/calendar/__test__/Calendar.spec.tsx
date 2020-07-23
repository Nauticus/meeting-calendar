import React from "react";
import { startOfMonth, format, addMonths, subMonths, setHours, compareAsc } from "date-fns";
import {
    render,
    fireEvent,
    queryAllByTestId as rtlQueryAllByTestId,
    getByTestId as rtlGetByTestId,
} from "@testing-library/react";
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
    let currentTime: Date;
    const getEvents = (currentTime: Date): Event[] => [
        {
            name: "Event 1",
            start: setHours(currentTime, 2),
            end: setHours(currentTime, 3),
            meetingRoom: "Arbanasi",
            participants: [],
        },
        {
            name: "Event 2",
            start: setHours(currentTime, 1),
            end: setHours(currentTime, 2),
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
            start: setHours(currentTime, 3),
            end: setHours(currentTime, 4),
            meetingRoom: "Arbanasi",
            participants: [],
        },
    ];

    beforeEach(() => {
        console.error = jest.fn();
        store = configureStore();
        currentDate = startOfMonth(new Date());
        currentTime = new Date();
        store.dispatch(CalendarDuck.actionCreators.setCurrentDate(currentDate));

        createEvents(store, getEvents(currentTime));
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

    test("should show at least 3 events in single day", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const dayElement = getByTestId(format(currentTime, "d:L:y"));

        expect(rtlQueryAllByTestId(dayElement, /^gridEvent.*/i)).toHaveLength(3);
    });

    test("should show events in ascending order", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const currentDayCell = getByTestId(format(currentTime, "d:L:y"));
        const gridEvents = rtlQueryAllByTestId(currentDayCell, /^gridEvent.*/i).map(
            (value) => rtlGetByTestId(value, "eventName").textContent
        );

        expect(gridEvents).toStrictEqual(["Event 2", "Event 1", "Event 4"]);
    });

    test("should click on a day and show overlay", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const currentDayCell = getByTestId(format(currentTime, "d:L:y"));

        fireEvent.click(currentDayCell);

        expect(getByTestId("eventsDialog")).toBeInTheDocument();
    });

    test("should show all events in a given day by ascending order embeded in dialog", () => {
        const { getByTestId } = render(<Calendar />, { wrapper: getProviderWrapper(store) });
        const currentDayCell = getByTestId(format(currentTime, "d:L:y"));

        fireEvent.click(currentDayCell);

        const eventsInDialog = rtlQueryAllByTestId(getByTestId("eventsDialog"), "eventItem").map((item) => ({
            name: rtlGetByTestId(item, "eventName").textContent,
            time: rtlGetByTestId(item, "eventTime").textContent,
            meetingRoom: rtlGetByTestId(item, "eventMeetingRoom").textContent,
        }));
        const expected = getEvents(currentTime)
            .sort((a, b) => compareAsc(a.start, b.start))
            .map((event) => ({
                name: event.name,
                time: `${format(event.start, "hh:mm a")} - ${format(event.end, "hh:mm a")}`,
                meetingRoom: event.meetingRoom,
            }));

        expect(eventsInDialog).toStrictEqual(expected);
    });
});

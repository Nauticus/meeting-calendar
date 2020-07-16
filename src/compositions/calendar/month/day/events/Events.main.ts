import { connect } from "react-redux";

import { State as GlobalState } from "app/store/types";
import { selectors } from "app/compositions/calendar/Calendar.state";

import Events from "./Events.view";
import { createSelector } from "reselect";
import { isSameMonth } from "date-fns";

const monthEventsSelector = createSelector(selectors.events, selectors.currentDate, (events, currentDate) =>
    events.filter((event) => isSameMonth(event.start, currentDate))
);

const stateProps = (state: GlobalState) => ({
    currentDate: selectors.currentDate(state),
    eventsInCurrentMonth: monthEventsSelector(state),
});

const WrappedEvents = connect(stateProps)(Events);

export default WrappedEvents;

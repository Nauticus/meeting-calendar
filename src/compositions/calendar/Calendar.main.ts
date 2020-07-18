import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State as GlobalState } from "app/store/types";

import Calendar from "./Calendar.view";
import { actionCreators, selectors } from "./Calendar.state";

const stateProps = (state: GlobalState) => ({
    events: selectors.events(state),
});

const dispatchProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addEvent: actionCreators.addEvent,
        },
        dispatch
    );

const WrappedCalendar = connect(stateProps, dispatchProps)(Calendar);

export default WrappedCalendar;

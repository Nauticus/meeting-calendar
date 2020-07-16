import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { State as GlobalState } from "app/store/types";
import { selectors, actionCreators } from "app/compositions/calendar/Calendar.state";

import Day from "./Day.view";

const stateProps = (state: GlobalState) => ({
    currentDate: selectors.currentDate(state),
});

const dispatchProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addEvent: actionCreators.addEvent,
        },
        dispatch
    );

const WrappedDay = connect(stateProps, dispatchProps)(Day);

export default WrappedDay;

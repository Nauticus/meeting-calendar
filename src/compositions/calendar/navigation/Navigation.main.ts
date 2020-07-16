import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State as GlobalState } from "app/store/types";

import Navigation from "./Navigation.view";
import { actionCreators, selectors } from "../Calendar.state";

const stateProps = (state: GlobalState) => ({
    currentDate: selectors.currentDate(state)
});

const dispatchProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            setCurrentDate: actionCreators.setCurrentDate,
        },
        dispatch
    );

const WrappedNavigation = connect(stateProps, dispatchProps)(Navigation);

export default WrappedNavigation;

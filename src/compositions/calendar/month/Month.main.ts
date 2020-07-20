import { connect } from "react-redux";

import { State as GlobalState } from "app/store/types";

import Month from "./Month.view";
import { selectors } from "../Calendar.state";

const stateProps = (state: GlobalState) => ({
    currentDate: selectors.currentDate(state)
});

const WrappedMonth = connect(stateProps)(Month);

export default WrappedMonth;

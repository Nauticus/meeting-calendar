import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppProps {
    title?: string;
}

const App = ({ title }: AppProps) => <div>{title}</div>;

ReactDOM.render(<App title="Some text here" />, document.getElementById("root"));

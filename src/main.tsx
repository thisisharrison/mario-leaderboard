import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("root")!
);

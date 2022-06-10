import App from "./pages/App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("root")!
);

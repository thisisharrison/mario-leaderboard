import App from "./pages/App";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element");

const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                backgroundColor: "#5c258d",
                backgroundImage: "linear-gradient(62deg, #5c258d 0%, #4389a2 100%)",
                color: "gray.200",
            },
        },
    },
});

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);

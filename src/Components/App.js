import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configure from "Modules/configure";

import Router from "./Router";
import GlobalStyles from "./GlogalStyles";

const store = configure();

function App() {
    return (
        // 리덕스 스토어 연동
        <Provider store={store}>
            <BrowserRouter>
                <Router />
                <GlobalStyles />
            </BrowserRouter>
        </Provider>
    );
}

export default App;

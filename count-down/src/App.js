import "./App.css";
import CountDown from "./components/CountDown.tsx";
import { useTranslation } from "react-i18next";
import SearchResult from "./components/tour-radar/index";
import React, { useState } from "react";

function App() {
    const { t } = useTranslation();

    const [countPage, changePage] = useState(true);
    return (
        <div className="App">
            <button onClick={() => changePage(true)}>CountDown</button>
            <button onClick={() => changePage(false)}>Tour Radar</button>
            {countPage ? (
                <div>
                    <h1>{t("STARTS IN")}</h1>
                    <CountDown />
                </div>
            ) : (
                <div>
                    <SearchResult />
                </div>
            )}
        </div>
    );
}

export default App;

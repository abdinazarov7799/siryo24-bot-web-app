import React, {Suspense, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import HomePage from "../modules/home/HomePage.jsx";
import {useTelegram} from "../hooks/useTelegram.jsx";
import ApplicationPage from "../modules/application/ApplicationPage.jsx";
import SavedPage from "../modules/saved/SavedPage.jsx";
import InfoPage from "../modules/info/InfoPage.jsx";
import ArchivePage from "../modules/archive/ArchivePage.jsx";

const Router = ({ ...rest }) => {
    const {tg} = useTelegram();
    useEffect(() => {
        tg?.ready();
        tg?.expand();
        tg?.enableClosingConfirmation()
    }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
            <Route
              path={"/catalog/:userId/:lang"}
              index
              element={<HomePage />}
            />
            <Route
              path={"/application/:userId/:lang"}
              index
              element={<ApplicationPage />}
            />
            <Route
              path={"/saved/:userId/:lang"}
              index
              element={<SavedPage />}
            />
            <Route
              path={"/info/:userId/:lang"}
              index
              element={<InfoPage />}
            />
            <Route
              path={"/archive/:userId/:lang"}
              index
              element={<ArchivePage />}
            />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

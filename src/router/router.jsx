import React, {Suspense, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import HomePage from "../modules/home/HomePage.jsx";
import {useTelegram} from "../hooks/useTelegram.jsx";

const Router = ({ ...rest }) => {
    const {tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
            <Route
              path={"/:userId/:lang"}
              index
              element={<HomePage />}
            />
            {/*<Route*/}
            {/*  path={"/product/view/:userId/:lang/:id"}*/}
            {/*  index*/}
            {/*  element={<ProductViewPage />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={"/basket/:userId/:lang"}*/}
            {/*  index*/}
            {/*  element={<BasketPage />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={"/orders/:userId/:lang"}*/}
            {/*  index*/}
            {/*  element={<OrdersPage />}*/}
            {/*/>*/}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CenterLoader } from "../components/loaders";
import { LOGIN, MAIN_LAYOUT, NOT_FOUND } from "./constants";
import HandleNotFound from "./handle-not-found";
import CurrentUser from "../services/context/currentUser";
import PrivateRoute from "../services/protected-routes";

const LoginPage = React.lazy(() => import("../pages/authentication/login/"));

const Layout = React.lazy(() => import("../shared/layout"));

const RouterConfig: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={CenterLoader()}>
          <Routes>
            <Route element={<LoginPage />} path={LOGIN} />
            {/* handle 404s */}
            <Route element={<HandleNotFound />} path={NOT_FOUND} />
          </Routes>
          <CurrentUser>
            <PrivateRoute component={Layout} path={MAIN_LAYOUT} />
          </CurrentUser>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default RouterConfig;

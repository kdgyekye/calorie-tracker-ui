import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./cookie.config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Routes>
        <Route
            {...rest}
            element={
                <React.Fragment>
                  {
                    !Auth.getCipher()?
                    <Navigate to="/login" />
                    :
                    <Component />
                  }
                </React.Fragment>
            }
        />
    </Routes>

  );
};

export default PrivateRoute;

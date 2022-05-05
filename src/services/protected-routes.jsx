import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./cookie.config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Routes>
        <Route
            {...rest}
            element={
                !Auth.getCipher()?
                <Navigate to="/login" replace />
                :
                <Component />
            }
        />
    </Routes>

  );
};

export default PrivateRoute;

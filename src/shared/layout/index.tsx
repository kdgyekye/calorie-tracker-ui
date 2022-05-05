import { Fragment, useState, Suspense, useEffect } from "react";
// import { NOT_FOUND } from "../../navigation/constants";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminRole, RouteProp } from "../../navigation/types";
import { SideBar } from "./components/side-bar";
import  routes from "../../navigation/routes";
import { Header } from "./components/header";
import { PageLoader } from "../../components/loaders";
import { useCurrentUser } from "../../services/context/currentUser";
import HandleNotFound from "../../navigation/handle-not-found";
import { NOT_FOUND } from "../../navigation/constants";

const Layout = () => {
  const userData = useCurrentUser();

  const [isInRoute, setisInRoute] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    let isIn = routes.find(
      (r) => r.path.split("/")[1] === pathname.split("/")[1]
    );
    setisInRoute(isIn ? true : false);
  }, [pathname]);

  console.log(isInRoute)
  return isInRoute ? (
    // return (
    <Fragment>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        <SideBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        {/* Content area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header setMobileMenuOpen={setMobileMenuOpen} />
          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto scrollContainer">
              <Suspense fallback={PageLoader()}>
                <Routes>
                  {routes.map((route: RouteProp, i: number) => {
                    if (route?.role?.includes(userData?.role as AdminRole)) {
                      console.log('route', route, " userData", userData)
                      return (

                            <Route
                                key={i}
                                path={route.path}
                                element={<route.component />}
                            />

                      )
                    } else { return null }
                  })}
                  {/* handle 404s */}
                  <Route element={<HandleNotFound />} path={NOT_FOUND} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    // );
    <Navigate to="/login" replace/>
  );
};

export default Layout;

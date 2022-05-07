import * as React from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/auth/queries";
import { CenterLoader } from "../../components/loaders";
import { User, CurrentUserOutputProps } from "./types";

interface CurrentUserComponentProps {
    children: React.ReactNode;
}

export const CurrentUserContext = React.createContext<User | undefined>(
  {} as User
);

const CurrentUserComponent: React.FC<CurrentUserComponentProps> = ( { children }) => {
  const { data, loading } = useQuery<CurrentUserOutputProps, any>(
    CURRENT_USER, {
      fetchPolicy: "no-cache"
    }
  );

  console.log(data)
  return (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <CenterLoader />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CurrentUserContext.Provider value={data?.currentUser}>
            {children}
          </CurrentUserContext.Provider>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);

export default CurrentUserComponent;

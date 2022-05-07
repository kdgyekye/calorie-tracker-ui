import AlertBase  from "../../../components/modals/alertModal";
import { LogoutIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../../services/context";
import { Dispatch, SetStateAction, FC } from "react";
import {useMutation} from "@apollo/client"
import {LOGOUT} from "../../../services/graphql/auth/mutations"

interface ILogoutProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Logout:FC<ILogoutProps> = ({ show, setShow }) => {
  const [{ signOut }] = useAuthProvider();
  const navigate = useNavigate();

  const [invokeLogout, { loading }] = useMutation(LOGOUT);


  const handleLogout = () => {
    invokeLogout()
    signOut();
    navigate("/login");
    setShow(false);
  };
  return (
    <>
      <AlertBase show={show}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <LogoutIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Logout User
              </p>
              <p className="mt-1 font-light text-sm text-gray-500">
                Are you sure you want to logout?
              </p>
              <div className="mt-3 flex space-x-7">
                <button
                  onClick={handleLogout}
                  className="bg-white rounded-md text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {loading? "Logging out" : "Logout"}
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                onClick={() => {
                  setShow(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </AlertBase>
    </>
  );
};

export default Logout;

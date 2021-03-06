import { Fragment, FC, Dispatch, SetStateAction } from "react";
import { classNames } from "../../../components/classnames";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { navigation } from "./menus";
import { useLocation, Link } from "react-router-dom";
import { AdminRole, NavigationProp } from "../../../navigation/types";
import { useCurrentUser } from "../../../services/context/currentUser";
import logo from "../../../assets/images/logo.jpg";

interface Props {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<Props> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { pathname } = useLocation();
  const userData = useCurrentUser();
  return (
    <Fragment>
      {/* Narrow sidebar */}
      <div className="hidden w-60 bg-blue-900 overflow-y-auto scrollContainerForSidebar md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex w-full items-center px-5 space-x-2">
            <img className="h-16 w-auto rounded-lg bg-gray-100" src={logo} alt="Workflow" />
            <div className={`flex font-semibold text-sm text-white  flex-col`}>
              <span>KINGSLEY'S</span>
              <span>CALORIE TRACKER</span>
            </div>
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {navigation.map((item: NavigationProp) => {
              if (item.role.includes(userData?.role as AdminRole)) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href.split("/")[1] === pathname.split("/")[1]
                        ? "bg-blue-800 text-white"
                        : "text-blue-100 hover:bg-blue-800 hover:text-white",
                      "group w-full p-3 rounded-md flex flex-row items-center text-sm"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        pathname === item.href
                          ? "text-white"
                          : "text-blue-300 group-hover:text-white",
                        "h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="text-center ml-2">
                      {item.name}
                    </span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-blue-700 pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-1 right-0 -mr-14 p-1">
                  <button
                    type="button"
                    className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex space-x-2 items-end">
                <img
                  className="h-12 rounded-full w-auto"
                  src={logo}
                  alt="Workflow"
                />
                <div
                  className={`flex font-semibold text-sm text-white flex-col`}
                >
                  <span>Kingsleys's</span>
                  <span>Calorie Tracker</span>
                </div>
              </div>
              <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                <nav className="h-full flex flex-col">
                  <div className="space-y-1">
                    {navigation.map((item: NavigationProp) => {
                      if (item.role.includes(userData?.role as AdminRole)) {
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              pathname === item.href
                                ? "bg-blue-800 text-white"
                                : "text-blue-100 hover:bg-blue-800 hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                          >
                            <item.icon
                              className={classNames(
                                pathname === item.href
                                  ? "text-white"
                                  : "text-blue-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export { SideBar };

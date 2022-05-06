import React, { FC } from "react";
import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "../../../services/context/currentUser";

interface IFoodProps {
  name: string;
  calories: number;
  date: string;
  meal: string;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEntry: React.Dispatch<React.SetStateAction<any>>;
}

const FoodCard: FC<IFoodProps> = ({
  name,
  calories,
  date,
  meal,
  setShowAdd,
  setUpdate,
  setSelectedEntry
}) => {
  const currentUser = useCurrentUser();
  const foodImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
  return (
    <div className="relative overflow-hidden lg:col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
          src={foodImage}
          alt=""
        />
        <div className={"absolute top-4 -right-3"}>
          <div className="flex flex-col items-center text-white px-2 py-1 bg-blue-600 rounded-full">
            <span style={{ fontSize: "0.7rem" }} className="mr-3 font-light">
              {meal || "Not Specified"}
            </span>
          </div>
        </div>
        <h3 className="mt-6 text-gray-900 text-lg font-medium">{name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Date Taken</dt>
          <dd className="text-gray-700 text-md">
            {new Date(date).toDateString()}
          </dd>
          <dt className="sr-only">Calories</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-md font-medium bg-green-100 rounded-full">
              {calories}
            </span>
          </dd>
        </dl>
      </div>
      {currentUser?.role === "ADMIN" && (
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
              <button className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:bg-orange-500 hover:text-gray-100">
                <EyeIcon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-3">View</span>
              </button>
            </div>
            <div
              className="-ml-px w-0 flex-1 flex"
              onClick={() => {
                setShowAdd(true);
                setUpdate(true);
				setSelectedEntry({
					name,
					calories,
					date,
					meal,
				});
              }}
            >
              <div className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:bg-orange-500 hover:text-gray-100">
                <PencilAltIcon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-3">Update</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;

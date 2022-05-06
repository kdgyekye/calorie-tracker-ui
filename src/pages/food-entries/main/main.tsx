import React, { Fragment, useState, useEffect, lazy } from "react";
import { EmptyAlert } from "../../../components/alerts/empty";
import { ErrorAlert } from "../../../components/alerts/error";
import { DataLoader } from "../../../components/loaders";
import { Pagination } from "../../../components/ui-modules/pagination";
import { GET_FOOD_ENTRIES } from "../../../services/graphql/food-entries/queries";
import { UPDATE_USER } from "../../../services/graphql/users/mutations";
import { IFoodEntry } from "../../../services/graphql/food-entries/types";
import {
  IUpdateUserInput,
  IUpdateUserResponse,
  LimitReached,
} from "../../../services/graphql/users/types";
import { useQuery, useMutation } from "@apollo/client";
import { usePagination } from "../../../components/hooks";
import { Dropdown } from "../../../components/ui-modules/dropdown";
import { PaginationDropdown } from "../../../components/ui-modules/paginationDropdown";
import { SearchBar } from "../../../components/ui-modules/search";
import { PlusCircleIcon } from "@heroicons/react/solid";
//import { useCurrentUser } from "../../../services/context/currentUser";
import FoodCard from "../components/food-card";
import toast from "react-hot-toast";
import  DateRangePicker from "../../../components/ui-modules/date-rangepicker"

const AddFoodEntry = lazy(() => import("../add/add"));

const list = [
  { id: 1, name: "Filter By Created At Date" },
  { id: 2, name: "Filter By Name of Food" },
];

const limits = [8, 32, 64];
const FoodEntries = () => {
  const [selectedFilter, setSelectedFilter] = useState(list[0]);
  const [selectedLimit, setSelectedLimit] = useState(limits[0]);
  const { limit, setLimit, setSkip, skip } = usePagination(selectedLimit);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<any>()
  const [showAdd, setShowAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<IFoodEntry>();

  //const user = useCurrentUser();

//   const CALORIE_LIMIT = user?.limit;
//   //const [calorieTreshold, setCalorieTreshold] = useState<number>(0);
//   const [calorieTresholdReached, setCalorieTresholdReached] = useState<
//     LimitReached[]
//   >([]);

  const {
    data: foodEntries,
    loading,
    refetch,
  } = useQuery(GET_FOOD_ENTRIES, {
    variables: {
      pagination: { skip, limit },
	  populate: ["meal"]
    },
  });

  const [invokeUpdateUser, { loading: updatingUser }] = useMutation<
    IUpdateUserResponse,
    IUpdateUserInput
  >(UPDATE_USER);

  //get calories from food entries
//   const getCaloriesLimitReached = () => {
//     const today = new Date();
//     let calories = 0;

//     //get food entries for a particular day
//     let todayEntries = foodEntries?.foodEntries?.filter((entry: IFoodEntry) => {
//       const date = new Date(entry.createdAt);
//       return date.toDateString() === today.toDateString();
//     });
// 	console.log(todayEntries)

//     //Get calories from food entries
//     todayEntries?.forEach((foodEntry: IFoodEntry) => {
//       calories += foodEntry.calorieValue;
//     });
//     if (calories > CALORIE_LIMIT) {
//       toast.error(`You have reached your calorie limit of ${CALORIE_LIMIT}`);

//       //make copy of caloriesTresholdReached state into an array
//       const newReachedArray = [...calorieTresholdReached];

//       //check if the calorie limit has been reached for the day
//       const todayEntryReached = newReachedArray.findIndex((entry: any) => {
//         return entry?.reachedAt?.toDateString() === today.toDateString();
//       });

//       //if the calorie limit has been reached for the day, update it in the array, else,
//       //add the date to the array
//       if (todayEntryReached >= 0) {
//         console.log("yes");
//         newReachedArray[todayEntryReached].calories = calories;
//         setCalorieTresholdReached(newReachedArray);
//         invokeUpdateUser({
//           variables: {
//             input: {
//               limitReached: newReachedArray,
//             },
//           },
//         });
//       } else {
//         console.log("no");
//         setCalorieTresholdReached([
//           ...calorieTresholdReached,
//           {
//             calories: calories,
//             reachedAt: today,
//           },
//         ]);
//         invokeUpdateUser({
//           variables: {
//             input: {
//               limitReached: [
//                 ...calorieTresholdReached,
//                 {
//                   calories: calories,
//                   reachedAt: today,
//                 },
//               ],
//             },
//           },
//         });
//       }
//     }
//   };

//   console.log(calorieTresholdReached);

//   useEffect(() => {
//     getCaloriesLimitReached();
//     console.log("getting");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [foodEntries]);

  useEffect(() => {
    setLimit(selectedLimit);
  }, [selectedLimit, setLimit]);
  return (
    <Fragment>
      <div className={"mt-3 px-6 flex flex-row items-center justify-between"}>
        <div>
          {
			  selectedFilter.id === 2 ?
			  <SearchBar
				type="text"
				value={search}
				onChange={(e: any) => setSearch(e?.target?.value)}
				placeholder="Search for data"
				/>
				:
				<DateRangePicker
					setDates={setDateRange}
					dates={dateRange}
					disabled={false}
				/>
		  }  
        </div>

        <div className={"flex flex-row items-center"}>
          <div className={"mr-3"}>
            <PaginationDropdown
              list={limits}
              selected={selectedLimit}
              setSelected={setSelectedLimit}
            />
          </div>
          <div className={"mr-3"}>
            <Dropdown
              list={list}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </div>
          <div>
            <div
              onClick={() => setShowAdd(true)}
              //type="button"
              className="inline-flex cursor-pointer text-white hover:text-white items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add New
              <PlusCircleIcon className=" ml-1 h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className={"relative bg-gray-50 px-4 sm:px-6 lg:px-8"}>
        {loading ? (
          <DataLoader />
        ) : (
          <Fragment>
            {foodEntries ? (
              <Fragment>
                {foodEntries?.foodEntries?.length === 0 ? (
                  <div
                    className={`flex items-center justify-center`}
                    style={{ height: "70vh" }}
                  >
                    <EmptyAlert
                      emptyMessage={"There are no food entries"}
                      canAdd
                      buttonMessage={"Add New Entry"}
                      add={() => setShowAdd(true)}
                    />
                  </div>
                ) : (
                  <div className="mt-12 md:space-y-0 grid gap-5 lg:grid-cols-3 2xl:grid-cols-4 lg:max-w-none">
                    {foodEntries?.foodEntries?.map(
                      (foodEntry: any, idx: number) => (
                        <FoodCard
                          key={idx}
                          name={foodEntry?.food}
                          calories={foodEntry?.calorieValue}
                          date={foodEntry?.createdAt}
						  meal={foodEntry?.meal?.name}
						  setShowAdd={setShowAdd}
						  setUpdate={setUpdate}
						  setSelectedEntry={setSelectedEntry}
                        />
                      )
                    )}
                    <div className={`mt-6 w-full md:col-span-3 2xl:col-span-4`}>
                      <Pagination
                        total={foodEntries?.foodEntriesLength}
                        skip={skip}
                        limit={limit}
                        setSkip={setSkip}
                      />
                    </div>
                  </div>
                )}
              </Fragment>
            ) : (
              <ErrorAlert reload={refetch} canReload model={"food entries"} />
            )}
          </Fragment>
        )}
      </div>
      <AddFoodEntry 
		show={showAdd} 
		setShow={setShowAdd} 
		refetch={refetch} 
		update={update} 
		data={selectedEntry} 
	  />
    </Fragment>
  );
};

export default FoodEntries;

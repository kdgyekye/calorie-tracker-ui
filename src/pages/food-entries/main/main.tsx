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
} from "../../../services/graphql/users/types";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { usePagination } from "../../../components/hooks";
import { Dropdown } from "../../../components/ui-modules/dropdown";
import { PaginationDropdown } from "../../../components/ui-modules/paginationDropdown";
import { SearchBar } from "../../../components/ui-modules/search";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useCurrentUser } from "../../../services/context/currentUser";
import FoodCard from "../components/food-card";
import toast from "react-hot-toast";
import { HAS_EXCEEDED_LIMIT } from "../../../services/graphql/user-stats/queries";
import DateRangePicker from "../../../components/ui-modules/date-rangepicker";
import moment from "moment";

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
  const [dateRange, setDateRange] = useState<any>();
  const [showAdd, setShowAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<IFoodEntry>();
  const [newUserLimit, setNewUserLimit] = useState();

  const currentUser = useCurrentUser();

  const {
    data: foodEntries,
    loading,
    refetch,
  } = useQuery(GET_FOOD_ENTRIES, {
    variables: {
      pagination: { skip, limit },
      populate: ["meal", "user"],
      startDate: dateRange && moment(dateRange[0]),
      endDate: dateRange && moment(dateRange[1]),
    },
  });

  const [getHasExceedLimit, { data: hasExceededLimit }] = useLazyQuery(HAS_EXCEEDED_LIMIT)

  const [invokeUpdateUser] = useMutation<
    IUpdateUserResponse,
    IUpdateUserInput
  >(UPDATE_USER);

  useEffect(() => {
    if (currentUser?.role === "USER") {
      getHasExceedLimit({
        fetchPolicy: "no-cache",
      })
      if (hasExceededLimit?.hasUserExceededLimitToday) {
        toast.error("You have exceeded your calorie limit for today");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[foodEntries,currentUser])

  const changeUserLimit = () => {
    invokeUpdateUser({
      variables: {
        input: {
          limit: newUserLimit,
        },
      },
    }).then(() => {
      refetch();
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    changeUserLimit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setNewUserLimit])

  useEffect(() => {
    setLimit(selectedLimit);
  }, [selectedLimit, setLimit]);


  console.log(dateRange)
  return (
    <Fragment>
      <div className={"mt-3 px-6 flex flex-row items-center justify-between"}>
        <div>
          {selectedFilter.id === 2 ? (
            <SearchBar
              type="text"
              value={search}
              onChange={(e: any) => setSearch(e?.target?.value)}
              placeholder="Search for data"
            />
          ) : (
            <DateRangePicker
              setDates={setDateRange}
              dates={dateRange}
              datetoDisable="future"
              disabled={false}  
            />
          )}
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
              onClick={() => {
                setUpdate(false);
                setShowAdd(true);
              }}
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
                          _id={foodEntry._id}
                          name={foodEntry?.food}
                          calories={foodEntry?.calorieValue}
                          date={foodEntry?.createdAt}
                          meal={foodEntry?.meal}
                          user={foodEntry?.user}
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

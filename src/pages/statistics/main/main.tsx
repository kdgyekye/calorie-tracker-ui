import React, { Fragment } from "react";
import { GET_DAYS_LIMIT__EXCEEDED } from "../../../services/graphql/user-stats/queries";
import { useQuery } from "@apollo/client";
import UserStatsCard from "./components/user-stats-card";
import { CircleSpinner } from "react-spinners-kit";
import { ErrorAlert } from "../../../components/alerts/error";
import { EmptyAlert } from "../../../components/alerts/empty";

const UserStatistics = () => {
  const { data, loading } = useQuery(GET_DAYS_LIMIT__EXCEEDED, {
    fetchPolicy: "no-cache",
  });
  console.log(data);
  return (
    <Fragment>
      <div className="lg:p-6 p-3 overflow-y-scroll max-h-main-page-height">
        <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lgl:grid-cols-4 mt-3">
            <h3 className="text-lg leading-6 col-span-2 font-medium text-gray-900">
              Days You Exceeded Your Calorie Limit
            </h3>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="absolute flex justify-center items-center">
              <CircleSpinner />
            </div>
          ) : data ? (
            data?.daysUserExceededLimit?.length === 0 ? (
              <div className="absolute flex justify-center items-center">
                <EmptyAlert
                  emptyMessage={
                    "You have not exceeded the limit on any day yet"
                  }
                />
              </div>
            ) : (
              data?.daysUserExceededLimit?.map((day: any, idx: number) => {
                return (
                  <UserStatsCard
                    key={idx}
                    day={day?.day}
                    total={day?.total}
                    limit={day?.limit}
                  />
                );
              })
            )
          ) : (
            <div className="absolute flex justify-center items-center">
              <ErrorAlert
                model={"calorie statistics"}
                canReload={false}
                reload={() => {}}
                message={"Something went wrong. Try again later"}
              />
            </div>
          )}
        </dl>
      </div>
    </Fragment>
  );
};

export default UserStatistics;

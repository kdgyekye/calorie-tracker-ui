import { Fragment } from "react";
import StatsCard from "../components/stats-card";
import { useQuery } from "@apollo/client";
import {
  GET_ENTRIES_WEEK,
  GET_ENTRIES_TWO_WEEKS,
  GET_LAST_WEEK_AVERAGE_ENTRIES,
} from "../../../services/graphql/dashboard/queries";
import { IAverageEntriesResponse } from "../../../services/graphql/dashboard/types";
import { CircleSpinner } from "react-spinners-kit";
import { ErrorAlert } from "../../../components/alerts/error";
import { EmptyAlert } from "../../../components/alerts/empty";
import DataView from "../components/dataview/dataview";

const Dashboard = () => {
  const { data: weekData, loading: weekLoading } = useQuery(GET_ENTRIES_WEEK, {
    fetchPolicy: "no-cache",
  });
  const { data: twoWeeksData, loading: twoWeeksLoading } = useQuery(
    GET_ENTRIES_TWO_WEEKS,
    {
      fetchPolicy: "no-cache",
    }
  );
  const { data: lastWeekData, loading: lastWeekLoading } = useQuery<
    IAverageEntriesResponse,
    {}
  >(GET_LAST_WEEK_AVERAGE_ENTRIES, {
    fetchPolicy: "no-cache",
  });
  return (
    <Fragment>
      <div className="lg:p-6 p-3 overflow-y-scroll max-h-main-page-height">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatsCard
            title="Total Entries From Past Week"
            value={weekData?.sumLastWeekEntries}
            loading={weekLoading}
          />
          <StatsCard
            title="Total Entries From Last 2 Weeks"
            value={twoWeeksData?.sumLastTwoWeeksEntries}
            loading={twoWeeksLoading}
          />
        </dl>
        <div className=" mt-6">
          <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-3">
            <h3 className="text-lg leading-6 col-span-2 font-medium text-gray-900">
              Average Number of Calories Added Per User In The Past Week
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-3">
            <div
              style={{ height: "50vh" }}
              className="relative col-span-2 border overflow-y-scroll overflow-x-hidden flex shadow-none border-gray-200 bg-white"
            >
              {lastWeekLoading ? (
                <CircleSpinner />
              ) : (
                <Fragment>
                  {lastWeekData ? (
                    <Fragment>
                      {lastWeekData?.averageLastWeekEntries?.length === 0 ? (
                        <div
                          className={`flex justify-center w-full items-center`}
                        >
                          <EmptyAlert emptyMessage={"user.emptyMessage"} />
                        </div>
                      ) : (
                        <DataView data={lastWeekData?.averageLastWeekEntries} />
                      )}
                    </Fragment>
                  ) : (
                    <ErrorAlert
                      reload={() => null}
                      canReload={false}
                      model={"User"}
                    />
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;

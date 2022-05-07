import { Fragment } from "react";
import StatsCard from "../components/stats-card";
import { useQuery } from "@apollo/client";
import {
  GET_ENTRIES_WEEK,
  GET_ENTRIES_TWO_WEEKS,
} from "../../../services/graphql/dashboard/queries";

const Dashboard = () => {
  const { data: weekData, loading: weekLoading } = useQuery(GET_ENTRIES_WEEK);
  const { data: twoWeeksData, loading: twoWeeksLoading } = useQuery(
    GET_ENTRIES_TWO_WEEKS
  );
  return (
    <Fragment>
      <div className="lg:p-6 p-3 overflow-y-scroll max-h-main-page-height">
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StatsCard
              title="Total Entries From Past Week"
              value={weekData}
              loading={weekLoading}
            />
            <StatsCard
              title="Total Entries From Last 2 Weeks"
              value={twoWeeksData?.sumLastTwoWeeksEntries}
              loading={twoWeeksLoading}
            />
          </dl>

      </div>
    </Fragment>
  );
};

export default Dashboard;

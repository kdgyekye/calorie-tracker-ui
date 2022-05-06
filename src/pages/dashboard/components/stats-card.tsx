import React from "react";
import { DocumentReportIcon } from "@heroicons/react/outline";
import { CircleSpinner } from "react-spinners-kit";

interface IStatsCardProps {
  title: string;
  value: number;
  loading: boolean;
}

const StatsCard: React.FC<IStatsCardProps> = ({ title, value, loading }) => {
  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-none border border-gray-200 rounded-none overflow-hidden">
      <dt>
        <div className="absolute bg-blue-100 rounded-md p-3">
          <DocumentReportIcon
            className="h-5 w-5 text-blue-800"
            aria-hidden="true"
          />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {title}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <div className="text-2xl font-semibold text-gray-900">
          {loading ? (
            <>
              <div>
                <CircleSpinner size={15} color={"#D97706"} />
              </div>
            </>
          ) : (
            value
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gray-100 px-4 py-4 sm:px-6" />
      </dd>
    </div>
  );
};

export default StatsCard;

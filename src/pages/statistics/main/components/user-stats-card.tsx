import React from "react";
import { CalendarIcon, ArrowSmUpIcon } from "@heroicons/react/outline";

interface IStatsCardProps {
  day: string;
  total: number;
  limit: number;
}

const UserStatsCard: React.FC<IStatsCardProps> = ({ day, total, limit }) => {
  console.log(limit)
  return (
    <dl className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-orange-600 rounded-md p-3">
          <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-700 truncate">
          {new Date(day).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {total} <span className="font-medium text-gray-600 text-lg">Calories</span>
        </p>
        <p className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
          <ArrowSmUpIcon
            className="self-center flex-shrink-0 h-5 w-5 text-green-500"
            aria-hidden="true"
          />
          <span className="sr-only">Increased By</span>
          {(((total-limit) / limit) * 100).toFixed(1)}%
        </p>
      </dd>
    </dl>
  );
};

export default UserStatsCard;

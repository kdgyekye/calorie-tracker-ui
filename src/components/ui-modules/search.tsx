import { SearchIcon } from "@heroicons/react/solid";
import { FC } from "react";

interface Props {}

export const SearchBar: FC<
  Props | React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  return (
    <div>
      <div className="mt-1 w-96 relative rounded-md shadow-sm">
        <label className="sr-only">Search Food Entries</label>
        <input
          placeholder="Search Food Entries"
          {...props}
          className="focus:ring-orange-700 focus:border-orange-700 py-3 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

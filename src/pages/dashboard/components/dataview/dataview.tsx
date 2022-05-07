import { FC, Fragment} from "react";
import Card from "./card";
import { AverageLastWeekEntry } from "../../../../services/graphql/dashboard/types";

interface IProps {
  data: AverageLastWeekEntry[];
}

const DataView: FC<IProps> = ({ data }) => {
  return (
    <Fragment>
      <div className="flex w-full flex-col">
        <div className="">
          <div className=" align-middle w-full inline-block">
            <div className="overflow-hidden w-full border-gray-200 ">
              <table className="border w-full">
                <thead className={"sticky top-0 border-b"}>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Entries
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Average Number of Calories
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-2 border-b divide-y divide-gray-100">
                  {data?.map((entry: any, entryIdx: number) => (
                    <Fragment key={entryIdx}>
                      <Card data={entry} />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DataView;

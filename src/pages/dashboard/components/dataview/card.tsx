import { FC } from "react";
import userPng from "../../../../assets/images/male.jpeg";

interface Props {
  data: any;
}

const Card: FC<Props> = ({ data }) => {
  console.log(data)
  return (
    <>
      <tr className={"bg-white pt-10"}>
        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {person.code}
        </td> */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={userPng}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {data?.user[0]?.name || "N/A"}
              </div>
              <div className="text-sm text-gray-500">{data?.user[0]?.email || "N/A"}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {data?.total || "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {data?.avg.toFixed(2) || "N/A"}
        </td>
      </tr>
    </>
  );
};

export default Card;

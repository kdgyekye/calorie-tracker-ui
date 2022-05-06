import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addpageToRoute } from "../utils";
import { useQueryStrings } from "../hooks";

interface PaginationProp {
  total: number;
  skip: number;
  limit: number;
  setSkip: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<PaginationProp> = ({
  total,
  limit,
  setSkip,
  skip,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQueryStrings();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (["", undefined, null].includes(query.get("page"))) {
      setPage(1); //set page
      // setEnteredPage(1); //set entered page
      setSkip(0); // set skip
    } else {
      let pageNumber = parseInt(query.get("page") as string);
      setPage(pageNumber);
      // setEnteredPage(pageNumber); //set entered page
      setSkip((pageNumber - 1) * limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, query.get("page"), setSkip]);

  const getEndPage = () => {
   let endPage = total
    if (total > limit) {
      if (total - skip < limit) {
        endPage = limit + (total - skip);
      } else {
        endPage = limit + skip;
      }
      return endPage;
    }
    return endPage
  };

  return (
    <nav
      className="mt-4 mb-4 px-4 py-3 flex items-center justify-between border-t border-gray-300"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className=" text-gray-700 font-medium">
        {`Showing, ${skip + 1} to ${getEndPage()} of ${total}`}
        </p>
      </div>
      <div className="flex-1 space-x-4 flex justify-between sm:justify-end">
        <button
          onClick={() => {
            let newPage = page - 1;
            setPage(newPage);
            // setEnteredPage(newPage);
            navigate(addpageToRoute(location, newPage.toString()));
          }}
          disabled={page === 1}
          className={`relative ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-50"
          } inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md  `}
        >
          Previous
        </button>
        <button
          disabled={page === Math.ceil(total / limit)}
          onClick={() => {
            let newPage = page + 1;
            setPage(newPage);
            // setEnteredPage(newPage);
            navigate(addpageToRoute(location, newPage.toString()));
          }}
          className={`relative ${
            page === Math.ceil(total / limit)
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-gray-100 bg-red-700 hover:bg-gray-50 hover:text-gray-700"
          } inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md  `}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

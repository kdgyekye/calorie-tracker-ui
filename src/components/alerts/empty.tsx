import React, { FC, Fragment } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import EmptyAsset from "../svg/empty";

interface IEmptyProps {
  canAdd?: boolean;
  emptyMessage: String;
  message?: String;
  buttonMessage?: String;
  add?: () => void;
}

const EmptyAlert: FC<IEmptyProps> = ({
  emptyMessage,
  canAdd,
  message,
  add,
  buttonMessage,
}) => {
  return (
    <Fragment>
      <div className={"flex flex-col items-center"}>
        <div>
          <EmptyAsset className={"h-40 w-40"} />
        </div>
        <div>
          <span className={"text-2xl font-bold"}>{emptyMessage}</span>
        </div>
        {canAdd ? (
          <div className={"mb-2"}>
            <span className={" font-light"}>
              Click Button Below
            </span>
          </div>
        ) : (
          <div className={"mb-2"}>
            <span className={" font-light"}>
              {message ? message || "You can new data by clicking the button below" : ""}
            </span>
          </div>
        )}
        {canAdd && (
          <Fragment>
            <div>
              <button
                type={"button"}
                onClick={add}
                className={
                  "border-2 border-dashed p-3 bg-white hover:bg-gray-50 flex flex-row items-center"
                }
              >
                <PlusIcon className={"h-6 w-6 mr-2 text-orange-500"} />
                <span className={"font-semibold"}>
                  {buttonMessage || "Add New"}
                </span>
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

EmptyAlert.defaultProps = {
  canAdd: false,
};

export { EmptyAlert };

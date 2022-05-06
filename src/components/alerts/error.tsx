import React, { FC, Fragment } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
// import ErrorAsset from "../svg/error";
import animteError from "../../assets/animateSvg.gif";

interface Props {
  model: string;
  canReload: boolean;
  message?: string;
  reload: () => void;
}

const ErrorAlert: FC<Props> = ({ model, canReload, message, reload }) => {
  return (
    <Fragment>
      <div className={"flex flex-col items-center"}>
        <div>
          <img src={animteError} alt={"error"} className={" h-56 w-auto"} />
        </div>
        <div className={"mt-2"}>
          <span className={"text-2xl font-bold"}>Can't fetch {model}</span>
        </div>
        <div className={"mb-2"}>
          <span className={" font-light"}>{message}</span>
        </div>
        {canReload && (
          <Fragment>
            <div>
              <button
                onClick={reload}
                className={
                  "border-2 border-dashed px-5 py-2 bg-white hover:bg-gray-50 flex flex-row items-center"
                }
              >
                <RefreshIcon className={"h-6 w-6 mr-2 text-orange-500"} />
                <span className={"font-semibold"}> Reload</span>
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

ErrorAlert.defaultProps = {
  message: "Some message for dey this side. So put some in the message prop",
};

export { ErrorAlert };

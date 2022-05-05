import * as React from "react";
import { CircleSpinner } from "react-spinners-kit";

const ButtonLoader = () => {
  return (
    <React.Fragment>
      <div>
        <CircleSpinner color={"#fff"} size={20} loading={true} />
      </div>
    </React.Fragment>
  );
};

export default ButtonLoader;

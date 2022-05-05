import * as React from "react";
import { ClassicSpinner } from "react-spinners-kit";

const DataLoader = () => {
  return (
    <React.Fragment>
      <div>
        <ClassicSpinner color={"#1F3A8A"} size={40} loading={true} />
      </div>
    </React.Fragment>
  );
};

export default DataLoader;

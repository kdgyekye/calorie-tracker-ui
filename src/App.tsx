import { Toaster } from "react-hot-toast";
import AppNavigation from "./services/context";

const App = () => {
  console.log("App");
  return (
      <>
        <AppNavigation />
        <Toaster
            position={"top-center"}
            reverseOrder={false}
            toastOptions={{
              // Define default options

              className: "",
              style: {
                background: "#363636",
                // background: "#00e676",
                color: "#fff",
                zIndex: 1,
                // width: "28vh",
              },
              duration: 5000,
              // Default options for specific types
              success: {
                duration: 8000,
                theme: {
                  primary: "#1F3A8A",
                  secondary: "black",
                },
              },
              error: {
                style: {
                  background: "#ffa726",
                },
                duration: 8000,
              },
            }}
        />
      </>
  );
};

export default App;

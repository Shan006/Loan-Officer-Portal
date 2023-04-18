import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Windmill } from "@windmill/react-ui";
import myTheme from "../myTheme";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          theme: {
            primary: "#4aed88",
          },
        },
      }}
    ></Toaster>
    <Router>
      <AuthProvider>
        <Windmill theme={myTheme}>
          {/* <Windmill> */}
          <App />
        </Windmill>
      </AuthProvider>
    </Router>
  </>
  /* </React.StrictMode> */
);

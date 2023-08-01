import {ContextProvider} from "./context/ContextProvider";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router}/>
      </ContextProvider>
    </React.StrictMode>
  )
}

export default App

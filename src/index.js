import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ChakraProvider } from "@chakra-ui/react";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);

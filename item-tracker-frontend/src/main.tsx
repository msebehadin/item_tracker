import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme
          appearance="light"
          accentColor="blue"
          radius="medium"
          scaling="100%"
        >
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

import { StrictMode } from "react";
import "./index.css";
import MyApp from "./App.tsx";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Theme>
      <MyApp />
    </Theme>
  </StrictMode>
);

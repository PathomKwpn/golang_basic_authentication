import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoginPage = React.lazy(() => import("./modules/auth/container"));
const HomePage = React.lazy(() => import("./modules/home/container"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateRoute = (path: string, Component: React.FC<any>) => (
  <Route
    path={path}
    element={
      <React.Suspense fallback={<Suspense />}>
        <Component />
      </React.Suspense>
    }
    key={path}
  />
);

export default function MyApp() {
  return (
    <BrowserRouter>
      <Routes>
        {CreateRoute("/", LoginPage)}
        {CreateRoute("/Home", HomePage)}
      </Routes>
    </BrowserRouter>
  );
}

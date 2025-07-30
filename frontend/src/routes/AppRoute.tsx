import Layout from "@/components/Layout";
import React from "react";
import { Routes, Route } from "react-router-dom";
const LoginPage = React.lazy(() => import("@/modules/auth/container"));
const HomePage = React.lazy(() => import("@/modules/home/container"));
const ChatAI = React.lazy(() => import("@/modules/Chat/ChatAI"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatai" element={<ChatAI />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

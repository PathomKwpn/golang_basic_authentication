// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ ต้อง import ก่อน render
import App from "./App.tsx"; // หรือ MyApp ถ้าคุณใช้ชื่อนี้

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

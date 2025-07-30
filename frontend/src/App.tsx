import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoute";

export default function MyApp() {
  return (
    <div className="relative min-h-screen transition-colors">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

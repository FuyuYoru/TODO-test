import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Providers } from "../providers";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/widgets/layouts/MainLayout";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Providers />}>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register/:id" element={<RegisterPage />}></Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/tasks" element={<HomePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
};

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { ModalManager } from "@/features/modal/ui/ModalManager";

export const Providers: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
        <ModalManager />
      </AuthProvider>
    </ThemeProvider>
  );
};

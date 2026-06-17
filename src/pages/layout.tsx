import { Outlet } from "react-router";
import { AppHeader } from "../components/common";
import { AppFooter } from "../components/common";

export default function RootLayout() {
  return (
    <div className="page">
      <AppHeader />
      <div className="container">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
}

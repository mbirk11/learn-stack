import { Outlet } from "react-router-dom";
import Header from "../header";

import "../../../index.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <footer className="main-layout__footer">footer</footer>
    </div>
  );
}

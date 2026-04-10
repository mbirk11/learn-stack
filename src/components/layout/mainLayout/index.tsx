import { Outlet } from "react-router-dom";
import Header from "../header";
import "../../../index.css";
import Footer from "../footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <div className="main-layout__footer">
        <Footer />
      </div>
    </div>
  );
}

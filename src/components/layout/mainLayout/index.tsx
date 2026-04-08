import { Outlet } from "react-router-dom";
import Header from "../header";

export default function MainLayout() {
  return (
    <div>
      <header>{<Header />}</header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
}

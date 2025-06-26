import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../main.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../main.css";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="p-10">
        <Outlet />
      </main>
        <ToastContainer
        className="border-2 border-bluewize bg-black"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

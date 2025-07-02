import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("API URL:", apiUrl);

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

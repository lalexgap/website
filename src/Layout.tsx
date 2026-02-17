import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-default">
      <NavBar />
      <main className="mx-auto mt-16 mb-auto w-full max-w-7xl flex-1 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

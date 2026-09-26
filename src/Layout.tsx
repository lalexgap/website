import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SquamishSend from "./SquamishSend";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-default">
      <NavBar />
      <main className="site-shell mb-auto flex w-full flex-1 py-6">
        <Outlet />
      </main>
      <Footer />
      <SquamishSend />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-default">
      <NavBar />
      <main className="site-shell mt-20 mb-auto flex w-full flex-1 pb-8 md:mt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

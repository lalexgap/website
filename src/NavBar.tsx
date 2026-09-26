import { NavLink } from "react-router-dom";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function NavBar() {
  const pages = [
    { name: "about", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/30 bg-primary/94 text-white shadow-[0_6px_18px_rgba(16,37,55,0.2)] backdrop-blur">
      <div className="site-shell flex items-center justify-between py-2 md:py-2.5">
        <div className="flex min-w-0 flex-1 gap-1">
          {pages.map((page) => (
            <NavLink
              key={page.name}
              to={page.url}
              className={({ isActive }) =>
                `block rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.08em] uppercase transition-colors sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {page.name}
            </NavLink>
          ))}
        </div>

        <div className="ml-2 flex shrink-0 gap-1">
          <a
            href="https://github.com/lalexgap"
            title="Github Profile"
            className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:p-2"
          >
            <GithubIcon className="size-[18px] sm:size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-gap-7ba83665/"
            title="LinkedIn Profile"
            className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:p-2"
          >
            <LinkedinIcon className="size-[18px] sm:size-5" />
          </a>
          <a
            href="mailto:me@alexgap.ca"
            title="Email"
            className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:p-2"
          >
            <Mail className="size-[18px] sm:size-5" />
          </a>
          <a
            href="/resume.pdf"
            title="Resume PDF"
            className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:p-2"
          >
            <FileText className="size-[18px] sm:size-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

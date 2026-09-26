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
        <div className="flex min-w-0 flex-1 gap-0.5 sm:gap-1">
          {pages.map((page) => (
            <NavLink
              key={page.name}
              to={page.url}
              className={({ isActive }) =>
                `flex h-9 items-center rounded-full px-2.5 text-xs font-medium tracking-[0.06em] uppercase transition-colors sm:h-10 sm:px-4 sm:text-sm ${
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

        <div className="ml-1 flex shrink-0 sm:ml-2 sm:gap-1">
          <a
            href="https://github.com/lalexgap"
            title="GitHub profile"
            aria-label="GitHub profile"
            className="grid size-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:size-11"
          >
            <GithubIcon className="size-[18px] sm:size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-gap-7ba83665/"
            title="LinkedIn profile"
            aria-label="LinkedIn profile"
            className="grid size-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:size-11"
          >
            <LinkedinIcon className="size-[18px] sm:size-5" />
          </a>
          <a
            href="mailto:me@alexgap.ca"
            title="Email me"
            aria-label="Email me"
            className="grid size-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:size-11"
          >
            <Mail className="size-[18px] sm:size-5" />
          </a>
          <a
            href="/resume.pdf"
            title="Resume (PDF)"
            aria-label="Resume (PDF)"
            className="grid size-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:size-11"
          >
            <FileText className="size-[18px] sm:size-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

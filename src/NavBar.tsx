import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function NavBar() {
  const pages = [
    { name: "about", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center bg-primary px-2 text-white sm:px-4">
      <div className="flex min-w-0 flex-1">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.url}
            className={({ isActive }) =>
              `my-2 block rounded px-2 py-1.5 text-xs font-medium uppercase text-white transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                isActive ? "bg-accent" : "hover:bg-primary-light"
              }`
            }
          >
            {page.name}
          </NavLink>
        ))}
      </div>

      <div className="flex shrink-0 gap-0 sm:gap-1 sm:pr-5">
        <a
          href="https://github.com/lalexgap"
          title="Github Profile"
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 sm:p-2"
        >
          <Github className="size-5 sm:size-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/alex-gap-7ba83665/"
          title="LinkedIn Profile"
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 sm:p-2"
        >
          <Linkedin className="size-5 sm:size-6" />
        </a>
        <a
          href="mailto:me@alexgap.ca"
          title="Email"
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 sm:p-2"
        >
          <Mail className="size-5 sm:size-6" />
        </a>
        <a
          href="/resume.pdf"
          title="Resume PDF"
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/10 sm:p-2"
        >
          <FileText className="size-5 sm:size-6" />
        </a>
      </div>
    </nav>
  );
}

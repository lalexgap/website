import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function NavBar() {
  const pages = [
    { name: "about", url: "/" },
    { name: "projects", url: "/projects" },
    { name: "resume", url: "/resume" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center bg-primary px-4 text-white">
      <div className="flex flex-1">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.url}
            className={({ isActive }) =>
              `my-2 block rounded px-4 py-2 text-sm font-medium uppercase text-white transition-colors ${
                isActive ? "bg-accent" : "hover:bg-primary-light"
              }`
            }
          >
            {page.name}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-1 pr-5">
        <a
          href="https://github.com/lalexgap"
          title="Github Profile"
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/alex-gap-7ba83665/"
          title="LinkedIn Profile"
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="mailto:me@alexgap.ca"
          title="Email"
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <Mail size={24} />
        </a>
        <a
          href="/resume.pdf"
          title="Resume PDF"
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <FileText size={24} />
        </a>
      </div>
    </nav>
  );
}

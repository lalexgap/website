import { Link } from "react-router-dom";
import PageMeta from "../PageMeta";

function About() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <PageMeta title="" path="/" />
      <div className="content-card flex w-full flex-col items-center px-6 py-8 sm:px-8 sm:py-10">
        <img
          src="/alex.webp"
          alt="Alex Gap"
          width={385}
          height={384}
          fetchPriority="high"
          className="mb-4 max-h-[300px] max-w-[300px] rounded-full border border-border-muted bg-white p-2 shadow-sm sm:mb-5 sm:max-h-[340px] sm:max-w-[340px]"
        />
        <h1 className="text-center text-4xl font-semibold tracking-tight text-text-primary">
          Alex Gap
        </h1>
        <h2 className="mb-4 text-center text-lg font-medium tracking-wide text-accent uppercase sm:mb-5">
          full-stack developer
        </h2>
        <p className="max-w-xl text-balance text-center text-[1.02rem] leading-relaxed text-text-primary">
          I'm a full-stack developer located in Squamish, BC, Canada. I
          currently work at{" "}
          <a href="https://www.producthunt.com/@lagap" className="text-link">
            Product Hunt
          </a>{" "}
          as a software engineer. Check out some of the cool{" "}
          <Link to="/projects" className="text-link">
            projects I've worked on
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default About;

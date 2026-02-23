import { useRef } from "react";

function About() {
  const profileTapCount = useRef(0);

  const handleProfileTap = () => {
    profileTapCount.current += 1;

    if (profileTapCount.current >= 5) {
      window.dispatchEvent(new Event("unlock-squamish-send"));
      window.dispatchEvent(new Event("unlock-skifree-easter-egg"));
      profileTapCount.current = 0;
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="content-card flex w-full flex-col items-center px-6 py-8 sm:px-8 sm:py-10">
        <img
          src="alex.png"
          alt="Alex Gap"
          onClick={handleProfileTap}
          className="mb-4 max-h-[300px] max-w-[300px] cursor-pointer rounded-full border border-border-muted bg-white p-2 shadow-sm sm:mb-5 sm:max-h-[340px] sm:max-w-[340px]"
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
          <a href="/projects" className="text-link">
            projects I've worked on
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;

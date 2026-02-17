function About() {
  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex max-w-[600px] flex-col items-center pb-2">
        <img
          src="alex.png"
          alt="Alex Gap"
          className="max-h-[385px] max-w-[385px] rounded-full p-2"
        />
        <h1 className="text-center font-display text-3xl text-text-primary">
          Alex Gap
        </h1>
        <h2 className="mb-2 text-center font-display text-2xl text-accent">
          full-stack developer
        </h2>
        <p className="py-1 text-text-primary">
          I'm a full-stack developer located in Squamish, BC, Canada. I
          currently work at{" "}
          <a
            href="https://www.producthunt.com/@lagap"
            className="text-primary underline"
          >
            Product Hunt
          </a>{" "}
          as a software engineer. Check out some of the cool{" "}
          <a href="/projects" className="text-primary underline">
            projects I've worked on
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;

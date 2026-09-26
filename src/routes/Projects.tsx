import { useState, useRef, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageMeta from "../PageMeta";

type ProjectMedia =
  | { kind: "image"; src: string; width: number; height: number }
  | {
      kind: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
    };

type Project = {
  name: string;
  link: string;
  media: ProjectMedia;
  description: string;
};

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projects: Project[] = [
    {
      name: "Agent Motel",
      link: "https://github.com/lalexgap/agent-motel",
      media: {
        kind: "image",
        src: "/agent-motel.webp",
        width: 1000,
        height: 562,
      },
      description: `A CLI for running a fleet of Claude Code and Codex coding agents in parallel. Each agent gets its own tmux session, git worktree, live status, and message queue, all managed from a single full-screen hub.`,
    },
    {
      media: {
        kind: "image",
        src: "/ethglobal-hack.webp",
        width: 1600,
        height: 926,
      },
      link: "https://ethglobal.com/showcase/scbridgeaccount-ivyas",
      name: "ETHGlobal 2023 Hackathon Entry",
      description: `Me and 3 other team members implemented a smart contract wallet (ERC4337) that also allowed instant bridging of assets between chains, winning multiple prizes.`,
    },
    {
      media: { kind: "image", src: "/go-nitro.webp", width: 1600, height: 966 },
      link: "https://github.com/statechannels/go-nitro",
      name: "go-nitro State Channel Framework",
      description: `As part of the state channels team I designed and implemented various parts of the go-nitro state channels framework.`,
    },
    {
      name: "EVM Bytecode Debugger",
      link: "https://github.com/lalexgap/bytecode-debugger",
      media: {
        kind: "video",
        src: "/bytecode-debugger.mp4",
        poster: "/bytecode-debugger-poster.webp",
        width: 600,
        height: 432,
      },
      description: `A little CLI tool that lets you step through EVM bytecode, to see what's going on under the hood of your smart contracts.`,
    },
    {
      name: "Web3Torrent",
      link: "https://web3torrent.statechannels.org/",
      media: {
        kind: "video",
        src: "/web3torrent.mp4",
        poster: "/web3torrent-poster.webp",
        width: 480,
        height: 436,
      },
      description: `As part of the state channels team I helped build web3 torrent that integrates state channel payments into the web torrent protocol.`,
    },
    {
      name: "SAFE Whitepaper",
      link: "https://github.com/statechannels/SAFE-protocol/blob/main/doc/SAFE.md",
      media: {
        kind: "image",
        src: "/safe-paper.webp",
        width: 1600,
        height: 932,
      },
      description: `A protocol for low cost and secure cross-chain transfers of value.`,
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const SWIPE_THRESHOLD = 50;

    if (distance > SWIPE_THRESHOLD) {
      handleNext();
    } else if (distance < -SWIPE_THRESHOLD) {
      handlePrevious();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentProject = projects[currentIndex];
  const mediaClassName =
    "h-auto max-h-[54vh] w-full rounded-xl border border-border-muted bg-white object-contain p-3 shadow-[0_8px_24px_rgba(16,37,55,0.08)] sm:p-4";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageMeta title="Projects" path="/projects" />
      <h1 className="sr-only">Projects</h1>
      <div
        className="relative flex min-h-[72vh] items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handlePrevious}
          aria-label="Previous project"
          className="button-subtle absolute top-1/2 left-0 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center sm:left-2"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="w-full max-w-[860px] px-8 sm:px-12">
          {currentProject.media.kind === "video" ? (
            <video
              key={currentProject.media.src}
              src={currentProject.media.src}
              poster={currentProject.media.poster}
              width={currentProject.media.width}
              height={currentProject.media.height}
              aria-label={`${currentProject.name} demo`}
              autoPlay
              muted
              loop
              playsInline
              className={mediaClassName}
            />
          ) : (
            <img
              key={currentProject.media.src}
              src={currentProject.media.src}
              alt={currentProject.name}
              width={currentProject.media.width}
              height={currentProject.media.height}
              decoding="async"
              className={mediaClassName}
            />
          )}
          <div className="content-card mt-4 p-5 sm:p-6">
            <h2 className="mb-2 text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
              <a href={currentProject.link} className="text-link">
                {currentProject.name}
              </a>
            </h2>
            <p className="text-sm leading-relaxed text-text-primary sm:text-base">
              {currentProject.description}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next project"
          className="button-subtle absolute top-1/2 right-0 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center sm:right-2"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 rounded-full bg-white/75 px-1 shadow-sm backdrop-blur">
          {projects.map((project, index) => (
            <button
              key={project.name}
              aria-label={`Go to project ${index + 1}: ${project.name}`}
              aria-current={index === currentIndex ? "true" : undefined}
              onClick={() => setCurrentIndex(index)}
              className="group grid h-9 min-w-8 cursor-pointer place-items-center"
            >
              <span
                className={`block h-2.5 rounded-full transition-all group-hover:bg-primary-light ${
                  index === currentIndex
                    ? "w-5 bg-primary"
                    : "w-2.5 bg-slate-400/80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

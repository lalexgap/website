import { useState, useRef, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projects = [
    {
      image: "ethglobal-hack.png",
      link: "https://ethglobal.com/showcase/scbridgeaccount-ivyas",
      name: "ETHGlobal 2023 Hackathon Entry",
      description: `Me and 3 other team members implemented a smart contract wallet (ERC4337) that also allowed instant bridging of assets between chains, winning multiple prizes.`,
    },
    {
      image: "go-nitro.png",
      link: "https://github.com/statechannels/go-nitro",
      name: "go-nitro State Channel Framework",
      description: `As part of the state channels team I designed and implemented various parts of the go-nitro state channels framework.`,
    },
    {
      name: "EVM Bytecode Debugger",
      link: "https://github.com/lalexgap/bytecode-debugger",
      image: "bytecode-debugger.gif",
      description: `A little CLI tool that lets you step through EVM bytecode, to see what's going on under the hood of your smart contracts.`,
    },
    {
      name: "Web3Torrent",
      link: "https://web3torrent.statechannels.org/",
      image: "web3torrent.gif",
      description: `As part of the state channels team I helped build web3 torrent that integrates state channel payments into the web torrent protocol.`,
    },
    {
      name: "SAFE Whitepaper",
      link: "https://github.com/statechannels/SAFE-protocol/blob/main/doc/SAFE.md",
      image: "safe-paper.png",
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

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        className="relative flex min-h-[72vh] items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handlePrevious}
          aria-label="Previous project"
          className="button-subtle absolute left-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-2 sm:left-2"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="w-full max-w-[860px] px-8 sm:px-12">
          <img
            src={currentProject.image}
            alt={currentProject.name}
            className="max-h-[54vh] w-full rounded-xl border border-border-muted bg-white object-contain p-3 shadow-[0_8px_24px_rgba(16,37,55,0.08)] sm:p-4"
          />
          <div className="content-card mt-4 p-5 sm:p-6">
            <h5 className="mb-2 text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
              <a href={currentProject.link} className="text-link">
                {currentProject.name}
              </a>
            </h5>
            <p className="text-sm leading-relaxed text-text-primary sm:text-base">
              {currentProject.description}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next project"
          className="button-subtle absolute right-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-2 sm:right-2"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/75 px-3 py-2 shadow-sm backdrop-blur">
          {projects.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to project ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full border border-transparent transition-all hover:scale-110 hover:bg-primary-light ${
                index === currentIndex
                  ? "w-5 border-primary/15 bg-primary"
                  : "bg-slate-400/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

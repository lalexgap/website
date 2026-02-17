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
    <div className="mx-auto max-w-5xl">
      <div
        className="relative flex min-h-[77vh] items-center justify-center pt-5"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="w-full max-w-[800px]">
          <img
            src={currentProject.image}
            alt={currentProject.name}
            className="max-h-[60vh] w-full object-contain"
          />
          <div className="mt-1 border-2 border-primary bg-bg-paper p-4">
            <h5 className="mb-1 text-xl font-medium">
              <a href={currentProject.link} className="text-primary underline">
                {currentProject.name}
              </a>
            </h5>
            <p className="text-sm">{currentProject.description}</p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full border-none transition-colors hover:bg-primary-light ${
                index === currentIndex ? "bg-primary" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

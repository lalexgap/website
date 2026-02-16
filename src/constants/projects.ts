import type { Project } from "../types";

export const PROJECTS: Project[] = [
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

export const GITHUB_RESUME_URL =
  "https://raw.githubusercontent.com/lalexgap/resume/main/resume.md";

export const navPages = [
  { name: "about", url: "/" },
  { name: "projects", url: "/projects" },
  { name: "resume", url: "/resume" },
];

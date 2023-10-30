function Projects() {
  return (
    <div>
      <h1>Here's a list of cool projects and things</h1>
      <ul>
        <li>
          <a href="https://github.com/statechannels/go-nitro">
            go-nitro state channels framework
          </a>
          . As part of the state channels team I designed and implemented
          various parts of our state channel framework in Go.
        </li>
        <li>
          <a href="https://ethonline.com/showcase/scbridgeaccount-ivyas">
            Ethglobal 2023 Hackathon Entry
          </a>
          . Me and 3 other team members implemented a smart contract wallet (ERC
          4337) that also allowed instant bridging of assets between chains. Our
          entry won "Polygon — Best Public Good with AA", "Scroll — Pool Prize",
          and "Scroll — Best Use" awards.
        </li>
        <li>
          <a href="https://github.com/lalexgap/bytecode-debugger">
            EVM Bytecode Debugger
          </a>{" "}
          A little CLI tool that lets you step through EVM bytecode, to see
          what's going on under the hood of your smart contracts.
        </li>
        <li>
          <a href="https://web3torrent.statechannels.org/">Web3Torrent</a>As
          part of the state channels team I helped build web3 torrent that
          integrates state channel payments into web torrent.
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=xYn8Evkrs30&t=2s&pp=ygURYWxleCBnYXAgZmlsZWNvaW4%3D">
            A talk I gave about performance testing our state channel framework.
          </a>{" "}
          Using the open source{" "}
          <a href="https://docs.testground.ai/master/#/">testground tool</a>, I
          was able to measure the performance of our framework and identify
          optimizations.
        </li>
      </ul>
    </div>
  );
}

export default Projects;

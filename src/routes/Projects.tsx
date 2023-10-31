import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Centered } from "../style";

const CarouselImage = styled.img`
  max-width: 800px;
  max-height: 600px;
`;
function Projects() {
  return (
    <Centered>
      <h1>Projects</h1>
      <Carousel
        emulateTouch={true}
        swipeable={true}
        useKeyboardArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoFocus={true}
      >
        <div>
          <CarouselImage src="go-nitro.png" />

          <p className="legend">
            {" "}
            <a href="https://github.com/statechannels/go-nitro">
              go-nitro state channels framework
            </a>
            . As part of the state channels team I designed and implemented
            various parts of our state channel framework in Go.
          </p>
        </div>
        <div>
          <a></a>
          <CarouselImage src="bytecode-debugger.gif" />

          <p className="legend">
            {" "}
            <a href="https://github.com/lalexgap/bytecode-debugger">
              EVM Bytecode Debugger
            </a>{" "}
            . A little CLI tool that lets you step through EVM bytecode, to see
            what's going on under the hood of your smart contracts.
          </p>
        </div>
        <div>
          <CarouselImage src="ethglobal-hack.png" />
          <p className="legend">
            <a href="https://ethglobal.com/showcase/scbridgeaccount-ivyas">
              Ethglobal 2023 Hackathon Entry
            </a>
            . Me and 3 other team members implemented a smart contract wallet
            (ERC 4337) that also allowed instant bridging of assets between
            chains. Our entry won "Polygon — Best Public G \sadas asdas
          </p>
        </div>
        <div>
          <CarouselImage src="web3torrent.gif" />
          <p className="legend">
            <a href="https://web3torrent.statechannels.org/">Web3Torrent</a>. As
            part of the state channels team I helped build web3 torrent that
            integrates state channel payments into web torrent.
          </p>
        </div>
        {/* <div>
          {" "}
          <ReactPlayer
            url={"https://www.youtube.com/embed/xYn8Evkrs30"}
            playing={false}
          />
          <p className="legend">
            <a href="https://www.youtube.com/embed/xYn8Evkrs30">
              A talk I gave about performance testing our state channel
              framework
            </a>{" "}
            . Using the open source{" "}
            <a href="https://docs.testground.ai/master/#/">testground tool</a>,
            I was able to measure the performance of our framework and identify
            optimizations.
          </p>
        </div> */}
      </Carousel>
    </Centered>
  );
}

export default Projects;

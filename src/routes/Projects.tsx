import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Link, Typography } from "@mui/material";

function Projects() {
  return (
    <Box
      sx={{
        maxWidth: 500,
        width: "100%",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Projects</h1>{" "}
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Carousel
          emulateTouch={true}
          swipeable={true}
          useKeyboardArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoFocus={true}
        >
          <Box>
            <img src="go-nitro.png" />

            <Typography className="legend">
              {" "}
              <Link href="https://github.com/statechannels/go-nitro">
                go-nitro state channels framework
              </Link>
              . As part of the state channels team I designed and implemented
              various parts of our state channel framework in Go.
            </Typography>
          </Box>
          <div>
            <Link></Link>
            <img src="bytecode-debugger.gif" />

            <Typography className="legend">
              {" "}
              <Link href="https://github.com/lalexgap/bytecode-debugger">
                EVM Bytecode Debugger
              </Link>{" "}
              . A little CLI tool that lets you step through EVM bytecode, to
              see what's going on under the hood of your smart contracts.
            </Typography>
          </div>
          <div>
            <img src="ethglobal-hack.png" />
            <Typography className="legend">
              <Link href="https://ethglobal.com/showcase/scbridgeaccount-ivyas">
                Ethglobal 2023 Hackathon Entry
              </Link>
              . Me and 3 other team members implemented a smart contract wallet
              (ERC 4337) that also allowed instant bridging of assets between
              chains. Our entry won "Polygon — Best Public G \sadas asdas
            </Typography>
          </div>
          <div>
            <img src="web3torrent.gif" />
            <Typography className="legend">
              <Link href="https://web3torrent.statechannels.org/">
                Web3Torrent
              </Link>
              . As part of the state channels team I helped build web3 torrent
              that integrates state channel payments into web torrent.
            </Typography>
          </div>
          {/* <div>
          {" "}
          <ReactPlayer
            url={"https://www.youtube.com/embed/xYn8Evkrs30"}
            playing={false}
          />
          <Typography className="legend">
            <Link href="https://www.youtube.com/embed/xYn8Evkrs30">
              A talk I gave about performance testing our state channel
              framework
            </Link>{" "}
            . Using the open source{" "}
            <Link href="https://docs.testground.ai/master/#/">testground tool</Link>,
            I was able to measure the performance of our framework and identify
            optimizations.
          </Typography>
        </div> */}
        </Carousel>
      </Box>
    </Box>
  );
}

export default Projects;

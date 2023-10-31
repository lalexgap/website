import Carousel from "react-material-ui-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Paper, Link, Typography, Container, CardMedia } from "@mui/material";

function Projects() {
  return (
    <Container>
      <Typography variant="h1" color="textPrimary">
        Projects
      </Typography>{" "}
      <Carousel>
        <Paper>
          <CardMedia component="img" image="go-nitro.png" />
          <Typography>
            {" "}
            <Link href="https://github.com/statechannels/go-nitro">
              go-nitro state channels framework
            </Link>
            . As part of the state channels team I designed and implemented
            various parts of our state channel framework in Go.
          </Typography>
        </Paper>
        <Paper>
          <CardMedia component="img" image="bytecode-debugger.gif" />
          <Typography>
            {" "}
            <Link href="https://github.com/lalexgap/bytecode-debugger">
              EVM Bytecode Debugger
            </Link>{" "}
            . A little CLI tool that lets you step through EVM bytecode, to see
            what's going on under the hood of your smart contracts.
          </Typography>
        </Paper>
        <Paper>
          <CardMedia component="img" image="ethglobal-hack.png" />
          <Typography className="legend">
            <Link href="https://ethglobal.com/showcase/scbridgeaccount-ivyas">
              Ethglobal 2023 Hackathon Entry
            </Link>
            . Me and 3 other team members implemented a smart contract wallet
            (ERC 4337) that also allowed instant bridging of assets between
            chains. Our entry won "Polygon — Best Public G \sadas asdas
          </Typography>
        </Paper>
        <Paper>
          <CardMedia component="img" image="web3torrent.gif" />
          <Typography className="legend">
            <Link href="https://web3torrent.statechannels.org/">
              Web3Torrent
            </Link>
            . As part of the state channels team I helped build web3 torrent
            that integrates state channel payments into web torrent.
          </Typography>
        </Paper>
      </Carousel>
    </Container>
  );
}

export default Projects;

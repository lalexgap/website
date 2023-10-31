import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  Link,
  Typography,
  Container,
  CardMedia,
  Box,
} from "@mui/material";

function Projects() {
  return (
    <Container>
      <Carousel
        swipe={true}
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        sx={{ paddingTop: 5 }}
        height={"80vh"}
      >
        <Card>
          <CardMedia
            component="img"
            image="go-nitro.png"
            sx={{ maxHeight: "68vh", objectFit: "contain" }}
          />
          <CardContent
            sx={(theme) => ({
              borderTop: `2px solid ${theme.palette.primary.main}`,
            })}
          >
            <Typography gutterBottom variant="h5">
              <Link href="https://github.com/statechannels/go-nitro">
                go-nitro state channels framework
              </Link>
            </Typography>
            <Typography variant="body2">
              As part of the state channels team I designed and implemented
              various parts of our state channel framework in Go.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="bytecode-debugger.gif"
              sx={{ maxHeight: "68vh", objectFit: "contain" }}
            />
          </Box>
          <CardContent
            sx={(theme) => ({
              borderTop: `2px solid ${theme.palette.primary.main}`,
            })}
          >
            <Typography gutterBottom variant="h5">
              <Link href="https://github.com/lalexgap/bytecode-debugger">
                EVM Bytecode Debugger
              </Link>
            </Typography>
            <Typography variant="body2">
              A little CLI tool that lets you step through EVM bytecode, to see
              what's going on under the hood of your smart contracts.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia
            component="img"
            sx={{ maxHeight: "68vh", objectFit: "contain" }}
            image="ethglobal-hack.png"
          />
          <CardContent
            sx={(theme) => ({
              borderTop: `2px solid ${theme.palette.primary.main}`,
            })}
          >
            <Typography gutterBottom variant="h5">
              <Link href="https://ethglobal.com/showcase/scbridgeaccount-ivyas">
                Ethglobal 2023 Hackathon Entry
              </Link>
            </Typography>
            <Typography variant="body2">
              Me and 3 other team members implemented a smart contract wallet
              (ERC 4337) that also allowed instant bridging of assets between
              chains, winning multiple prizes.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image="web3torrent.gif"
              sx={{ maxHeight: "68vh", objectFit: "contain" }}
            />
          </Box>
          <CardContent
            sx={(theme) => ({
              borderTop: `2px solid ${theme.palette.primary.main}`,
            })}
          >
            <Typography gutterBottom variant="h5">
              {" "}
              <Link href="https://web3torrent.statechannels.org/">
                Web3Torrent
              </Link>
            </Typography>
            <Typography variant="body2">
              As part of the state channels team I helped build web3 torrent
              that integrates state channel payments into the web torrent
              protocol.
            </Typography>
          </CardContent>
        </Card>
      </Carousel>
    </Container>
  );
}

export default Projects;

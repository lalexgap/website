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
        sx={{ paddingTop: 10 }}
      >
        <Card>
          <CardMedia component="img" image="go-nitro.png" />
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
          <CardMedia component="img" image="bytecode-debugger.gif" />
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
          <CardMedia component="img" image="ethglobal-hack.png" />
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
              . Me and 3 other team members implemented a smart contract wallet
              (ERC 4337) that also allowed instant bridging of assets between
              chains. Our entry won "Polygon — Best Public G \sadas asdas
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
              sx={{ maxWidth: 500, height: 600 }}
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
              that integrates state channel payments into web torrent.
            </Typography>
          </CardContent>
        </Card>
      </Carousel>
    </Container>
  );
}

export default Projects;

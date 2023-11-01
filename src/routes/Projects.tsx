import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  Link,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";

function Projects() {
  const projects = [
    {
      image: "go-nitro.png",
      content: (
        <Container>
          <Typography gutterBottom variant="h5">
            <Link href="https://github.com/statechannels/go-nitro">
              go-nitro state channels framework
            </Link>
          </Typography>
          <Typography variant="body2">
            As part of the state channels team I designed and implemented
            various parts of our state channel framework in Go.
          </Typography>
        </Container>
      ),
    },
    {
      image: "bytecode-debugger.gif",
      content: (
        <Container>
          <Typography gutterBottom variant="h5">
            <Link href="https://github.com/lalexgap/bytecode-debugger">
              EVM Bytecode Debugger
            </Link>
          </Typography>
          <Typography variant="body2">
            A little CLI tool that lets you step through EVM bytecode, to see
            what's going on under the hood of your smart contracts.
          </Typography>
        </Container>
      ),
    },
    {
      image: "ethglobal-hack.png",
      content: (
        <Container>
          {" "}
          <Typography gutterBottom variant="h5">
            <Link href="https://ethglobal.com/showcase/scbridgeaccount-ivyas">
              Ethglobal 2023 Hackathon Entry
            </Link>
          </Typography>
          <Typography variant="body2">
            Me and 3 other team members implemented a smart contract wallet (ERC
            4337) that also allowed instant bridging of assets between chains,
            winning multiple prizes.
          </Typography>
        </Container>
      ),
    },
    {
      image: "web3torrent.gif",
      content: (
        <Container>
          {" "}
          <Typography gutterBottom variant="h5">
            {" "}
            <Link href="https://web3torrent.statechannels.org/">
              Web3Torrent
            </Link>
          </Typography>
          <Typography variant="body2">
            As part of the state channels team I helped build web3 torrent that
            integrates state channel payments into the web torrent protocol.
          </Typography>
        </Container>
      ),
    },
  ];
  return (
    <Container>
      <Carousel
        swipe={true}
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        sx={{ paddingTop: 5 }}
        height={"80vh"}
      >
        {projects.map((project) => (
          <Card key={project.image} sx={{ backgroundColor: "transparent" }}>
            <CardMedia
              component="img"
              image={project.image}
              sx={{ maxHeight: "65vh", objectFit: "contain" }}
            />
            <CardContent
              sx={(theme) => ({
                mt: 1,
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.background.paper,
              })}
            >
              {project.content}
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
}

export default Projects;

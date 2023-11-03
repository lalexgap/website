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
  ];
  return (
    <Container>
      <Carousel
        swipe={true}
        autoPlay={true}
        navButtonsAlwaysVisible={true}
        sx={{ paddingTop: 5, minHeight: "77vh" }}
      >
        {projects.map((project) => (
          <Card
            key={project.image}
            title={project.name}
            sx={{ backgroundColor: "transparent" }}
          >
            <CardMedia
              component="img"
              image={project.image}
              sx={{ maxHeight: "60vh", objectFit: "contain" }}
            />
            <CardContent
              sx={(theme) => ({
                mt: 1,
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.background.paper,
              })}
            >
              <Container>
                <Typography gutterBottom variant="h5">
                  <Link href={project.link}>{project.name}</Link>
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
              </Container>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
}

export default Projects;

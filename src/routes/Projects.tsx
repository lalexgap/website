import { useState, useRef, type TouchEvent } from "react";
import {
  Card,
  CardContent,
  Container,
  Link,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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

  const navButtonStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  return (
    <Container>
      <Box
        sx={{
          paddingTop: 5,
          minHeight: "77vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            ...navButtonStyles,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Card
          sx={{
            backgroundColor: "transparent",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <CardMedia
            component="img"
            image={currentProject.image}
            sx={{ maxHeight: "60vh", objectFit: "contain" }}
          />
          <CardContent
            sx={(theme) => ({
              mt: 1,
              border: `2px solid ${theme.palette.primary.main}`,
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <Typography gutterBottom variant="h5">
              <Link href={currentProject.link}>{currentProject.name}</Link>
            </Typography>
            <Typography variant="body2">
              {currentProject.description}
            </Typography>
          </CardContent>
        </Card>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            ...navButtonStyles,
          }}
        >
          <ArrowForward />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {projects.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Projects;

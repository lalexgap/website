import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          textAlign: "center",
          borderLeft: 4,
          borderColor: "primary.main",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "6rem",
            fontWeight: "bold",
            color: "text.secondary",
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
}

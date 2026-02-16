import { Component, ReactNode, ErrorInfo } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary to gracefully handle React errors
 * Shows a fallback UI instead of crashing the entire app
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            p: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
          >
            <Typography variant="h4" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              An unexpected error occurred. Please try refreshing the page.
            </Typography>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                component="pre"
                sx={{
                  textAlign: "left",
                  p: 2,
                  backgroundColor: "grey.100",
                  borderRadius: 1,
                  overflow: "auto",
                  fontSize: "0.85rem",
                  color: "error.main",
                }}
              >
                {this.state.error.message}
              </Box>
            )}
            <Button
              variant="contained"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

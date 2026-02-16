import { Skeleton, Box } from "@mui/material";

interface LoadingSkeletonProps {
  /** Number of skeleton lines to show */
  lines?: number;
  /** Whether to show a circular avatar skeleton */
  showAvatar?: boolean;
  /** Height of each skeleton line */
  height?: number;
}

/**
 * Reusable loading skeleton component
 */
export default function LoadingSkeleton({
  lines = 3,
  showAvatar = false,
  height = 24,
}: LoadingSkeletonProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
      role="status"
      aria-busy="true"
    >
      {showAvatar && (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" height={height} />
          </Box>
        </Box>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={height}
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </Box>
  );
}

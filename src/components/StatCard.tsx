import type { ReactNode } from "react";
import { Box, Card, Typography } from "@mui/material";

type Tone = "red" | "blue" | "pink" | "amber";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
  tone?: Tone;
};

export default function StatCard({
  title,
  value,
  icon,
  tone = "red",
}: StatCardProps) {
  return (
    <Card className="stat-card" elevation={0}>
      <Box className="stat-info">
        <Typography variant="caption">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </Box>

      <Box className={`stat-icon tone-${tone}`}>{icon}</Box>
    </Card>
  );
}
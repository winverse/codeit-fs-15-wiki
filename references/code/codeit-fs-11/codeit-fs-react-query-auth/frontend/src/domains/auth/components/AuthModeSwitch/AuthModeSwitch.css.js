import { style } from "@vanilla-extract/css";

export const modeSwitch = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderRadius: 14,
  background: "rgba(37, 99, 235, 0.10)",
  padding: 4,
  overflow: "hidden",
});

export const modeButton = style({
  position: "relative",
  height: 44,
  border: 0,
  borderRadius: 10,
  background: "transparent",
  fontSize: 14,
  fontWeight: 700,
  color: "rgba(30, 41, 59, 0.7)",
  cursor: "pointer",
  transition: "all 160ms ease",
  zIndex: 1,
});

export const modePill = style({
  position: "absolute",
  top: 4,
  left: 4,
  height: 44,
  width: "calc(50% - 4px)",
  borderRadius: 10,
  background: "#ffffff",
  boxShadow: "0 10px 24px rgba(37, 99, 235, 0.12)",
  zIndex: 0,
  pointerEvents: "none",
});

export const modeButtonLabel = style({
  position: "relative",
  zIndex: 1,
});

export const modeButtonActive = style({
  color: "rgba(15, 23, 42, 0.92)",
});

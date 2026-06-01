import { style } from "@vanilla-extract/css";

export const hero = style({
  position: "relative",
  zIndex: 1,
  padding: "clamp(16px, 1vw, 24px) 0",
});

export const kicker = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 14px",
  borderRadius: 999,
  background: "rgba(37, 99, 235, 0.10)",
  color: "var(--color-primary-600)",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontWeight: 700,
});

export const title = style({
  fontSize: "clamp(30px, 4vw, 56px)",
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  color: "var(--color-text-primary)",
});

export const description = style({
  marginTop: 20,
  maxWidth: 640,
  fontSize: "clamp(15px, 1.2vw, 18px)",
  lineHeight: 1.75,
  color: "var(--color-text-secondary)",
});

export const codePanel = style({
  marginTop: 18,
  borderRadius: 18,
  padding: 18,
  background: "rgba(15, 23, 42, 0.92)",
  border: "1px solid rgba(37, 99, 235, 0.26)",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
});

export const codeTitle = style({
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(191, 219, 254, 0.92)",
  fontWeight: 800,
});

export const codeBlock = style({
  marginTop: 12,
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 13,
  lineHeight: 1.65,
  color: "rgba(226, 232, 240, 0.92)",
  whiteSpace: "pre",
});

export const statusGrid = style({
  marginTop: 28,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  "@media": {
    "(max-width: 1080px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const statusCard = style({
  borderRadius: 18,
  padding: 18,
  background: "rgba(255, 255, 255, 0.86)",
  border: "1px solid rgba(37, 99, 235, 0.16)",
  backdropFilter: "blur(10px)",
});

export const statusCardTitle = style({
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(30, 64, 175, 0.86)",
});

export const statusText = style({
  marginTop: 10,
  fontSize: 14,
  fontWeight: 600,
  color: "rgba(15, 23, 42, 0.92)",
  lineHeight: 1.4,
});

export const statusError = style({
  color: "#b91c1c",
});

export const statusSuccess = style({
  color: "var(--color-primary-700)",
});

export const statusIdle = style({
  color: "rgba(51, 65, 85, 0.9)",
});

import { style } from "@vanilla-extract/css";

export const page = style({
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: "32px 20px",
});

export const panel = style({
  width: "min(560px, 100%)",
  borderRadius: 20,
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.94))",
  border: "1px solid var(--color-border)",
  boxShadow:
    "0 20px 48px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
  padding: "28px 24px",
});

export const title = style({
  fontSize: 28,
  lineHeight: 1.2,
  fontWeight: 700,
  color: "var(--color-text-primary)",
});

export const description = style({
  marginTop: 12,
  color: "var(--color-text-secondary)",
  fontSize: 15,
  lineHeight: 1.6,
});

export const messageBox = style({
  marginTop: 18,
  borderRadius: 12,
  border: "1px solid rgba(30, 64, 175, 0.18)",
  background: "var(--color-primary-050)",
  color: "var(--color-text-secondary)",
  fontSize: 14,
  lineHeight: 1.5,
  padding: "12px 14px",
  wordBreak: "break-word",
});

export const buttonWrap = style({
  marginTop: 20,
});

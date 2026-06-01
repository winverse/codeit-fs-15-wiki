import { style, styleVariants } from "@vanilla-extract/css";

export const base = style({
  marginTop: 6,
  height: 48,
  borderRadius: 12,
  border: "1px solid transparent",
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "0.01em",
  cursor: "pointer",
  transition: "transform 120ms ease, filter 120ms ease, background 120ms ease",
  selectors: {
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px)",
      filter: "brightness(1.03)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

export const variant = styleVariants({
  primary: {
    background:
      "linear-gradient(120deg, var(--color-primary-700), var(--color-primary-500))",
    color: "#f8fafc",
  },
  ghost: {
    background: "transparent",
    borderColor: "rgba(37, 99, 235, 0.28)",
    color: "rgba(30, 64, 175, 0.92)",
    selectors: {
      "&:hover:not(:disabled)": {
        background: "rgba(37, 99, 235, 0.08)",
      },
    },
  },
});

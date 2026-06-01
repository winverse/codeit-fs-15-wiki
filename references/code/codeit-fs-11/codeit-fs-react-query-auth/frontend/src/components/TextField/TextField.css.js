import { style } from "@vanilla-extract/css";

export const field = style({
  display: "grid",
  gap: 8,
});

export const label = style({
  fontSize: 13,
  color: "rgba(30, 41, 59, 0.72)",
  fontWeight: 700,
});

export const input = style({
  height: 46,
  borderRadius: 12,
  border: "1px solid rgba(148, 163, 184, 0.42)",
  background: "#ffffff",
  padding: "0 14px",
  fontSize: 14,
  color: "rgba(15, 23, 42, 0.9)",
  outline: "none",
  transition: "border-color 140ms ease, box-shadow 140ms ease",
  selectors: {
    "&:focus": {
      borderColor: "var(--color-primary-500)",
      boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.18)",
    },
  },
});

export const inputInvalid = style({
  borderColor: "rgba(185, 28, 28, 0.55)",
  selectors: {
    "&:focus": {
      borderColor: "rgba(185, 28, 28, 0.8)",
      boxShadow: "0 0 0 4px rgba(185, 28, 28, 0.14)",
    },
  },
});

export const errorText = style({
  marginTop: 6,
  fontSize: 12,
  lineHeight: 1.4,
  color: "rgba(185, 28, 28, 0.95)",
});

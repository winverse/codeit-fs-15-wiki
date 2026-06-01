import { style } from "@vanilla-extract/css";

export const userSection = style({
  marginTop: 18,
});

export const userSectionTitle = style({
  fontSize: 14,
  fontWeight: 700,
  color: "rgba(15, 23, 42, 0.86)",
  marginBottom: 10,
});

export const userHint = style({
  fontSize: 13,
  color: "rgba(51, 65, 85, 0.9)",
});

export const userList = style({
  marginTop: 10,
  listStyle: "none",
  display: "grid",
  gap: 8,
  maxHeight: 280,
  overflow: "auto",
  paddingRight: 4,
});

export const userItem = style({
  borderRadius: 12,
  padding: "12px 14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(37, 99, 235, 0.06)",
  border: "1px solid rgba(37, 99, 235, 0.16)",
});

export const userItemNew = style({
  borderColor: "rgba(37, 99, 235, 0.55)",
  background: [
    "linear-gradient(0deg, rgba(37, 99, 235, 0.12), rgba(37, 99, 235, 0.12))",
    "rgba(239, 246, 255, 0.9)",
  ].join(", "),
});

export const userName = style({
  fontSize: 14,
  fontWeight: 700,
  color: "rgba(15, 23, 42, 0.92)",
});

export const userEmail = style({
  marginTop: 2,
  fontSize: 12,
  color: "rgba(51, 65, 85, 0.92)",
});

export const badge = style({
  padding: "5px 9px",
  borderRadius: 999,
  background: "var(--color-primary-600)",
  color: "#eff6ff",
  fontSize: 11,
  fontWeight: 700,
});

export const statusError = style({
  color: "#b91c1c",
});

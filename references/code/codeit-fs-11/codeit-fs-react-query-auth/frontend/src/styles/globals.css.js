import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  "--color-text-primary": "#0f172a",
  "--color-text-secondary": "#334155",
  "--color-surface": "#ffffff",
  "--color-surface-muted": "#f1f5f9",
  "--color-border": "rgba(15, 23, 42, 0.14)",
  "--color-primary-050": "#eff6ff",
  "--color-primary-500": "#2563eb",
  "--color-primary-600": "#1d4ed8",
  "--color-primary-700": "#1e40af",
});

globalStyle("html, body", {
  maxWidth: "100vw",
  overflowX: "hidden",
});

globalStyle("body", {
  color: "var(--color-text-primary)",
  background: "linear-gradient(135deg, #f8fafc 0%, #eef5ff 45%, #eff6ff 100%)",
  fontFamily: "var(--font-plus-jakarta-sans), 'Noto Sans KR', sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("h1, h2, h3", {
  fontFamily:
    "var(--font-space-grotesk), var(--font-plus-jakarta-sans), sans-serif",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button, input", {
  font: "inherit",
});

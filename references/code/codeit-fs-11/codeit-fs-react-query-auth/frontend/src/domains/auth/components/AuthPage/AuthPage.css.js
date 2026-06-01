import { globalStyle, style } from "@vanilla-extract/css";

export const page = style({
  position: "relative",
  minHeight: "100dvh",
  padding: "64px clamp(20px, 5vw, 72px)",
  display: "grid",
  gap: 28,
  gridTemplateColumns: "1.08fr 1fr",
  background: [
    "radial-gradient(circle at 15% 18%, rgba(37, 99, 235, 0.22), transparent 40%)",
    "radial-gradient(circle at 82% 78%, rgba(29, 78, 216, 0.16), transparent 46%)",
    "linear-gradient(135deg, #f8fafc 0%, #eef5ff 55%, #e8f0ff 100%)",
  ].join(", "),
  "@media": {
    "(max-width: 1080px)": {
      gridTemplateColumns: "1fr",
      paddingTop: 28,
    },
  },
});

const backdropCircleBase = style({
  position: "absolute",
  borderRadius: 999,
  filter: "blur(10px)",
  pointerEvents: "none",
});

export const backdropCircleOne = style([
  backdropCircleBase,
  {
    top: -100,
    right: "10%",
    width: 260,
    height: 260,
    background: "rgba(37, 99, 235, 0.14)",
  },
]);

export const backdropCircleTwo = style([
  backdropCircleBase,
  {
    left: -70,
    bottom: "12%",
    width: 230,
    height: 230,
    background: "rgba(29, 78, 216, 0.12)",
  },
]);

export const panel = style({
  position: "relative",
  zIndex: 1,
  padding: "clamp(20px, 2.2vw, 34px)",
  borderRadius: 26,
  background: "rgba(255, 255, 255, 0.92)",
  border: "1px solid rgba(37, 99, 235, 0.18)",
  boxShadow:
    "0 24px 60px rgba(15, 23, 42, 0.10), inset 0 1px rgba(255, 255, 255, 0.85)",
});

const feedbackBase = style({
  marginTop: 14,
  borderRadius: 12,
  padding: "10px 12px",
  fontSize: 13,
  lineHeight: 1.45,
});

export const formError = style([
  feedbackBase,
  {
    background: "rgba(185, 28, 28, 0.08)",
    border: "1px solid rgba(185, 28, 28, 0.18)",
    color: "rgba(127, 29, 29, 0.95)",
  },
]);

export const formSuccess = style([
  feedbackBase,
  {
    background: "rgba(37, 99, 235, 0.08)",
    border: "1px solid rgba(37, 99, 235, 0.18)",
    color: "rgba(30, 64, 175, 0.95)",
  },
]);

export const authInfoBox = style({
  marginTop: 16,
  borderRadius: 16,
  padding: 16,
  background: "rgba(37, 99, 235, 0.06)",
  border: "1px solid rgba(37, 99, 235, 0.16)",
  display: "grid",
  gap: 14,
});

export const authInfoText = style({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  color: "rgba(15, 23, 42, 0.9)",
});

globalStyle(`${authInfoText} strong`, {
  fontWeight: 800,
});

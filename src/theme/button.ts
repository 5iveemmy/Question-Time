import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  rounded: "md",
  color: "dark",
  bgColor: "transparent",
  borderColor: "#CBD5E1",
  fontWeight: "medium",
  fontSize: "sm",
});

const solid = defineStyle({
  rounded: "md",
  color: "white",
  bgColor: "brand.100",
  fontWeight: "medium",
  fontSize: "sm",
  _disabled: {
    opacity: 0.8,
    bgColor: "brand.100",
  },
  _hover: {
    opacity: 0.8,
    bgColor: "brand.100",
  },
});

const danger = defineStyle({
  px: 10,
  bgColor: "danger",
  color: "white",
  fontSize: "sm",
  _hover: {
    bgColor: "white",
    border: "1px solid danger",
    color: "danger",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, danger, solid },
});

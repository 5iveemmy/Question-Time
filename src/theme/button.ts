import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

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

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});

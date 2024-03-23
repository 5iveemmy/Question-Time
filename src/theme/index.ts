import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";
import { colors } from "./colors";

export const theme = extendTheme({
  colors,
  components: {
    Button: buttonTheme,
  },
});

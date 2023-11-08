// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Montserrat, sans-serif",
  },
  colors: {
    primary: {
      50: "#F7FAFC",

    },
    secondary: {
      50: "#FEEBC8",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        primary: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
        },
      },
    },
  },
});

export default theme;

import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    secondary: "#6a737d",
    white: "#fff",
    background: "#e1e4e8",
    appBar: "#24292e",
    error: "#d73a4a",
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
};

export default theme;

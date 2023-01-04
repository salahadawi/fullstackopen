import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
  },
});

const Text = ({ style, ...props }) => {
  const textStyle = [styles.text, style];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;

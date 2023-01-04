import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    fontFamily: theme.fonts.main,
  },
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.textInput, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;

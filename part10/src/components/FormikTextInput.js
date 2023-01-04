import { StyleSheet, TextInput, Text } from "react-native";
import { useField } from "formik";

import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 5,
    marginBottom: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={{
          ...styles.input,
          borderColor: showError
            ? theme.colors.error
            : styles.input.borderColor,
        }}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;

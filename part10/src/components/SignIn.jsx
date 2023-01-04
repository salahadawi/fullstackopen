import { Text, Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;

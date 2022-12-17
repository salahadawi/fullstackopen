import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 100,
    justifyContent: "space-around",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" link="/" />
      <AppBarTab text="Sign in" link="/signin" />
    </View>
  );
};

export default AppBar;

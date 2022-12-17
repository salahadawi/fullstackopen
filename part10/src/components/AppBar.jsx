import { View, StyleSheet, ScrollView } from "react-native";
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
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={{ gap: 10 }}
        horizontal
      >
        <AppBarTab text="Repositories" link="/" />
        <AppBarTab text="Sign in" link="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;

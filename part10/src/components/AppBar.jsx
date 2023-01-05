import { View, StyleSheet, ScrollView } from "react-native";
import { useApolloClient } from "@apollo/client";

import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import useAuthStorage from "../hooks/useAuthStorage";

import getMe from "../hooks/getMe";

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
  const { me } = getMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={{ gap: 10 }}
        horizontal
      >
        <AppBarTab text="Repositories" link="/" />
        {me ? (
          <AppBarTab text="Sign out" onPress={handleLogout} />
        ) : (
          <AppBarTab text="Sign in" link="signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

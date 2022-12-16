import { StyleSheet, Pressable, Text } from "react-native";

const styles = StyleSheet.create({
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const AppBarTab = () => {
  return (
    <Pressable onPress={() => console.log("Pressed!")}>
      <Text style={styles.tabText}>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;

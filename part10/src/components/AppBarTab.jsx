import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;

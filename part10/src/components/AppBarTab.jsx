import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
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

import { View, Image, StyleSheet } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 20,
  },
  dataList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dataItem: {
    alignItems: "center",
  },
  infoList: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    flexShrink: 1,
  },
});

const ItemData = ({ amount, label }) => {
  if (amount >= 1000) {
    amount = (amount / 1000).toFixed(1) + "k";
  }
  return (
    <View style={styles.dataItem}>
      <Text style={{ fontWeight: "bold" }}>{amount}</Text>
      <Text>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.infoList}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            {item.fullName}
          </Text>
          <Text style={{ marginBottom: 5 }}>{item.description}</Text>
          <Text
            style={{
              backgroundColor: theme.colors.primary,
              color: "white",
              padding: 5,
              borderRadius: 5,
              alignSelf: "flex-start",
              overflow: "hidden",
            }}
          >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.dataList}>
        <ItemData amount={item.stargazersCount} label="Stars" />
        <ItemData amount={item.forksCount} label="Forks" />
        <ItemData amount={item.reviewCount} label="Reviews" />
        <ItemData amount={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;

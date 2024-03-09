import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Card from "../../components/card";
import { User } from "../../constants/interfaces";

const Home: React.FC = () => {
  const { usersList } = useSelector((state: any) => state?.users);

  return (
    <View style={styles.container}>
      <FlatList
        data={usersList.filter((user: User) => !!user?.isFavourite)}
        keyExtractor={(item, index) => item?.login?.uuid || index.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    width: "85%",
  },
});

export default Home;

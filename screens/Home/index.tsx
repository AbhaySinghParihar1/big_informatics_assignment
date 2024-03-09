import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setUsersList } from "../../redux/slice/updateFavouriteCardSlice";
import Card from "../../components/card";
import { fetchUsers } from "./utils";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { usersList } = useSelector((state: any) => state?.users);

  const fetchData = async () => {
    try {
      setLoading(true);
      const users = await fetchUsers();
      dispatch(setUsersList(users?.results));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={usersList}
          keyExtractor={(item, index) => item?.login?.uuid || index.toString()}
          renderItem={({ item }) => <Card item={item} />}
        />
      )}
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

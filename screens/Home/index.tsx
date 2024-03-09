import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setUsersList } from "../../redux/slice/updateFavouriteCardSlice";
import Card from "../../components/card";
import { fetchUsers } from "./utils";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const dispatch = useDispatch();

  const { usersList } = useSelector((state: any) => state?.users);

  const fetchData = async (
    pageNumber: number = page,
    shouldRefresh: boolean = false
  ) => {
    if (loading) return;

    try {
      const users = await fetchUsers(pageNumber * 10);
      if (users?.results?.length > 0) {
        dispatch(
          setUsersList(
            pageNumber === 1 ? users.results : [...usersList, ...users.results]
          )
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      if (shouldRefresh) setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !refreshing) {
      setPage((prevPage) => prevPage + 1);
      fetchData(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  };

  useEffect(() => {
    setLoading(true);
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
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

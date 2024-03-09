import React, { useState, useCallback } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { RenderItemProps } from "../../constants/interfaces";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../redux/slice/updateFavouriteCardSlice";

const Card: React.FC<RenderItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleShortList = () => {
    if (item?.isFavourite) {
      dispatch(removeFromFavourite(item.id.value));
    } else {
      dispatch(addToFavourite(item.id.value));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: item.picture.large }} style={styles.image} />
      </View>
      <View style={{ marginLeft: 70 }}>
        <View style={styles.cardOuterContainer}>
          <Text
            numberOfLines={1}
            style={styles.name}
          >{`${item?.name?.title} ${item?.name?.first} ${item?.name?.last}`}</Text>
          <Pressable onPress={handleShortList}>
            <Image
              style={styles.fourImageContainer}
              source={
                item?.isFavourite
                  ? require("../../assets/starFill.png")
                  : require("../../assets/star.png")
              }
            />
          </Pressable>
        </View>
        <View style={styles.bottomContainer}>
          <Image
            source={require("../../assets/location-pin.png")}
            style={{ height: 10, width: 10, marginRight: 5 }}
          />
          <Text>{`${item.location.city} ${item.location.country}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.tagRedContainer}>
            <Text style={styles.tagContainer}>Music</Text>
          </View>
          <View style={styles.tagGreenContainer}>
            <Text style={styles.movieContainer}>Movie</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  innerContainer: {
    position: "absolute",
    left: -8,
  },
  cardOuterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    height: 30,
    width: 30,
    alignSelf: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  tagContainer: {
    alignSelf: "center",
    paddingHorizontal: 4,
  },
  tagGreenContainer: {
    backgroundColor: "green",
    padding: 2,
    marginTop: 4,
    borderRadius: 4,
    maxWidth: 55,
    marginLeft: 6
  },
  tagRedContainer: {
    backgroundColor: "red",
    padding: 2,
    marginTop: 4,
    borderRadius: 4,
    maxWidth: 55,
  },
  movieContainer: {
    alignSelf: "center",
    paddingHorizontal: 4,
  },
  fourImageContainer: {
    height: 30,
    width: 30,
    alignSelf: "center",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    width: "85%",
  },
});

export default Card;

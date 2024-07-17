import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRecoilState } from "recoil";
import { inputtextwallpaper } from "../atoms/wallpaperinputtext";
import Navbar from "./Navbar";

const Screen1 = ({ navigation }) => {
  const access_key = "xVToTBotSeAIBVVa6KSxIcoH7i20jV-pDL9dW2_SfA0";
  const [searchValue, setSearchValue] = useRecoilState(inputtextwallpaper);
  const [imageCollection, setImageCollection] = useState([]);
  // console.log(searchValue);
  useEffect(() => {
    const getImageCollection = async () => {
      let data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${searchValue}&client_id=${access_key}`
      );
      let jsondata = await data.json();
      setImageCollection(jsondata);
      // console.log(jsondata);
    };
    getImageCollection();
  }, [searchValue]);

  // console.log(imageCollection);

  if (imageCollection.total == 0) {
    setSearchValue("All");
  }

  const ShowWallpaper = (item) => {
    // console.log(item);
    navigation.navigate("S2", { clickedimage: `${JSON.stringify(item)}` });
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.textcontainer}>
        Showing results for {searchValue}
      </Text>

      <FlatList
        numColumns={2}
        data={imageCollection.results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => ShowWallpaper(item)}>
            <View style={styles.imagecontainer}>
              {/* <Text>{item.id}</Text> */}
              <Image source={{ uri: item.urls.regular }} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    alignItems: "center",
    marginTop: 10,
  },
  textcontainer: {
    fontSize: 20,
  },
  imagecontainer: {
    width: 200,
    height: 200,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Screen1;

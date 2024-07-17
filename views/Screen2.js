import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { inputtextwallpaper } from "../atoms/wallpaperinputtext";

const Screen2 = ({ route }) => {
  const access_key = "xVToTBotSeAIBVVa6KSxIcoH7i20jV-pDL9dW2_SfA0";
  const { clickedimage } = route.params;
  const [searchValue, setSearchValue] = useRecoilState(inputtextwallpaper);
  const [imagedata, setimagedata] = useState();
  useEffect(() => {
    setimagedata(JSON.parse(clickedimage)?.urls.regular);
  }, []);
  // console.log(typeof imagedata);
  const checkPermission = async () => {};
  const shownextimage = async () => {
    // console.log(searchValue);
    const data = await fetch(
      `https://api.unsplash.com/search/photos/?page=1&query=${searchValue}&client_id=${access_key}`
    );
    console.log(data.url);
    setimagedata(data.url.regular);
    // console.log("next image");
  };
  return (
    <View style={styles.imagecontainer}>
      <Image source={{ uri: imagedata }} style={styles.image} />

      <TouchableOpacity style={styles.downloadbtn} onPress={checkPermission}>
        <Text style={styles.downloadbtntxt}>Download</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextbtn} onPress={shownextimage}>
        <Text style={styles.nextbtntxt}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  downloadbtn: {
    position: "absolute",
    bottom: 10,
    left: 80,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 10,
  },
  downloadbtntxt: {
    color: "white",
    fontSize: 20,
    // fontWeight: 'bold',
  },
  nextbtn: {
    position: "absolute",
    bottom: 10,
    right: 80,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 10,
  },
  nextbtntxt: {
    color: "black",
    fontSize: 20,
    // fontWeight: 'bold',
  },
});

export default Screen2;

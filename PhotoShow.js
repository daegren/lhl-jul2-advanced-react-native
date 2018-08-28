import React from "react";
import { View, Image, Text } from "react-native";

const PhotoShow = ({ photo, navigator }) => {
  return (
    <View>
      <Image source={{ uri: photo.url }} style={{ width: 500, height: 500 }} />
      <Text>{photo.title}</Text>
    </View>
  );
};

export default PhotoShow;

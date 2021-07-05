import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Post = (props) => {
  return (
    <View style={styles.postContainer}>
      <Text>Hello {props.post.postData}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    height: 20,
    borderWidth: 1.5,
    borderColor: "#f1f1f1",
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, List, ListItem } from "react-native";
import * as firebase from "firebase";
import Post from "./Post";
import { Value } from "react-native-reanimated";

function HomeScreen({ navigation }) {
  const [text, setText] = useState("");
  const [PostList, setPostList] = useState([]);
  useEffect(() => {
    const myitems = firebase
      .database()
      .ref("posts")
      .on("value", (snapshot) => {
        const post = [];
        snapshot.forEach((val) => {
          // console.log(val);
          val.forEach((item) => {
            post.push({
              key: item.key,
              postData: item.val().textPost,
            });
          });

          // setPostList(snapshot);
          // console.log(snapshot);
        });
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text>Home!</Text>

      <View>
        {post.map((item) => (
          <Post post={item} key={user.key} />
        ))}
      </View>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

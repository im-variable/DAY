import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as firebase from "firebase";

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text>Profile!</Text>
      <Button
        title="Sign Out"
        onPress={() => firebase.auth().signOut()}
      ></Button>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProfileScreen;

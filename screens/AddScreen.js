import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  Image,
  ToastAndroid,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import Modal from "react-native-modal";

function AddScreen({ navigation }) {
  const [textPost, setTextPost] = useState("");

  const [image, setImage] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };

  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => setvisibleToast(false), [visibleToast]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    //image picker
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const HandlePost = async () => {
    const user = firebase.auth().currentUser;

    let servicesEnabled = await Location.hasServicesEnabledAsync();

    if (textPost !== "" && !servicesEnabled) {
      (async () => {
        try {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } catch (error) {}
      })();

      setvisibleToast(true);
    }
    if (textPost !== "" && servicesEnabled) {
      firebase
        .database()
        .ref("/posts/" + user.uid)
        .push({
          textPost: textPost.trim(),
          image: image,
          location: location,
          // createdDate: moment().utcOffset("+05:30").format(" hh:mm:ss a"),
        })
        .then(setTextPost(""), setImage(null), setLocation(null));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.postContainer}>
        <Text>What's on your location:</Text>
        <TextInput
          style={styles.textbox}
          numberOfLines={5}
          multiline={true}
          value={textPost}
          onChangeText={(text) => {
            setTextPost(text.trimStart());
          }}
        />
        <View style={styles.imageContainer}>
          {image && (
            <Image source={{ uri: image }} style={{ width: 65, height: 65 }} />
          )}
          <MaterialIcons
            name="add-box"
            size={72}
            color="#cccccc"
            onPress={pickImage}
          />
        </View>
        <Button title="Post" onPress={HandlePost} />
        <Toast
          visible={visibleToast}
          message="Need your location to publish post"
        />
      </View>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}

      {/* <Button title="Go to Home!" onPress={() => navigation.navigate("Home")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  postContainer: {
    width: "100%",
    marginTop: 20,
    padding: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textbox: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 0.2,
    borderColor: "gray",
    borderRadius: 3,
    backgroundColor: "#f1f1f1",
  },
});

export default AddScreen;

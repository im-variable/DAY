import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { AppLoading } from "expo";
import {
  useFonts,
  ReenieBeanie_400Regular,
} from "@expo-google-fonts/reenie-beanie";
import * as firebase from "firebase";
import Logo from "./Logo";
import * as Google from "expo-google-app-auth";

function LoginScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    ReenieBeanie_400Regular,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {});
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "907147852906-4dj5ah4l8qbaomf17gatltmjtkkh4c54.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.signinContainer}>
          <Logo />
          <TextInput
            style={styles.textbox}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="Email"
            autoCompleteType="email"
          />
          <TextInput
            style={styles.textbox}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Password"
          />
          <Button style={styles.button} title="Login" onPress={onLoginPress} />
          <Text style={{ textAlign: "center", padding: 20 }}>
            Forgot Login Details?
            <Text
              style={{
                color: "dodgerblue",
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Details
            </Text>
          </Text>
          <Text
            style={{
              color: "dodgerblue",
              alignSelf: "center",
              fontWeight: "bold",
            }}
            onPress={signInWithGoogleAsync}
          >
            Sign In with Google
          </Text>
        </View>
        <View style={styles.needAccountContainer}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              top: "50%",
            }}
          >
            Don't have an account?
            <Text
              style={{ color: "dodgerblue", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Signup")}
            >
              Signup
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textbox: {
    width: "100%",
    marginBottom: 10,
    height: 40,
    borderWidth: 0.2,
    borderColor: "gray",
    borderRadius: 3,
    backgroundColor: "#f1f1f1",
  },
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  signinContainer: {
    width: "80%",
    top: "25%",
    justifyContent: "flex-start",
  },
  needAccountContainer: {
    borderTopColor: "gray",
    borderTopWidth: 0.2,
    bottom: "4%",
    position: "absolute",
    width: "100%",
  },
  button: {
    height: 50,
    borderRadius: 3,
  },
});

export default LoginScreen;

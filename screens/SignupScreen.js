import { auth } from "firebase";
import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import Logo from "./Logo";

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignupPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  //   onBackToLoginPress = () => {
  //     this.props.navigation.navigate("Login");
  //   };

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
        />
        <TextInput
          style={styles.textbox}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
          placeholder="Username"
        />
        <TextInput
          style={styles.textbox}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
        />
        <TextInput
          style={styles.textbox}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          placeholder="Confirm Password"
        />
        <Button style={styles.button} title="Signup" onPress={onSignupPress} />
      </View>
      <View style={styles.needAccountContainer}>
        <Text
          style={{
            color: "#000000",
            textAlign: "center",
            top: "50%",
          }}
        >
          Already have an account?
          <Text
            style={{ color: "dodgerblue", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
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
    top: "20%",
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

export default SignupScreen;

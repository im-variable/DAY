import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { AppLoading } from "expo";
import {
  useFonts,
  ReenieBeanie_400Regular,
} from "@expo-google-fonts/reenie-beanie";
import Logo from "./Logo";

function ForgotPasswordScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    ReenieBeanie_400Regular,
  });

  const [email, setEmail] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.signinContainer}>
          <Logo />
          <TextInput
            style={styles.textbox}
            value={email}
            onChangeText={(text) => {
              setEmail({ email: text });
            }}
            placeholder="Email"
            autoCompleteType="email"
          />
          <Button style={styles.button} title="Reset Password" />
          <Text style={{ textAlign: "center", padding: 20 }}>
            Back to{" "}
            <Text
              style={{
                color: "dodgerblue",
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
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
    borderRadius: 2,
  },
});

export default ForgotPasswordScreen;

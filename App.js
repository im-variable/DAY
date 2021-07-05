import React from "react";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LoadingScreen from "./screens/LoadingScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { YellowBox } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: true,
    };

    YellowBox.ignoreWarnings(["Setting a timer"]);
    //initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    //    console.log(firebase);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  };

  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Loading"}
          screenOptions={{
            title: "DAY",
            headerTitleAlign: "center",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

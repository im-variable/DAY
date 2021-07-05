import React from "react";
import { View, Text } from "react-native";

export default function Logo() {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          width: 80,
          height: 80,
          borderTopStartRadius: 1,
          alignSelf: "center",
          borderRadius: 80 / 2,
          backgroundColor: "orange",
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            padding: 5,
            fontSize: 50,
            fontFamily: "ReenieBeanie_400Regular",
            color: "#000000",
            alignSelf: "center",
          }}
        >
          Day
        </Text>
      </View>
    </View>
  );
}

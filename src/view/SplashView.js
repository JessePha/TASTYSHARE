import React from "react";
import { View, Text } from "react-native";
const SplashView = () => {
  return (
    <View>
      <LottieView
        style={{ width: 200, height: 200 }}
        source= {require('../../assets/11390-food.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashView;

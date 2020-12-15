import React from "react";
import { View } from "react-native";
import Button from "../../../../UI/CustomButton";

const NavigationItem = ({ navigateTo, text, color }) => {
  return (
    <>
      <Button
        key={text}
        text={text}
        color = {color}
        onClick={() => navigateTo.navigate(text)}
      />
    </>
  );
};

export default NavigationItem;

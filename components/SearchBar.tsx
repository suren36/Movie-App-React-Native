import { View, Text } from "react-native";
import React from "react";
import { Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";

type SearchBarsProps = {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBars = ({ placeholder, onPress, value, onChangeText }: SearchBarsProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-4 py-3">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBars;
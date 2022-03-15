import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const Checkbox = ({ isChecked, onPress }: CheckboxProps) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons
        name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
        size={30}
        color="white"
      />
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({});

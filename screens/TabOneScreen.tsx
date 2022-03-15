import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useState } from "react";
import Checkbox from "../components/Checkbox";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleCheckBox = (): void => {
    setIsSelected((selected) => !selected);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox isChecked={isSelected} onPress={handleCheckBox} />
        <TextInput
          style={{
            flex: 1,
            fontSize: 17,
            color: "#fff",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

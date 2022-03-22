import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import ProjectItem from "../components/ProjectComponent/ProjectItem";
import { useState } from "react";
import { Project } from "../inrterfaces/projectInterface";

export default function TabTwoScreen() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "project", createdAt: "2d" },
    { id: 2, title: "project2", createdAt: "3d" },
    { id: 3, title: "project3", createdAt: "4d" },
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProjectItem project={item} />}
        ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

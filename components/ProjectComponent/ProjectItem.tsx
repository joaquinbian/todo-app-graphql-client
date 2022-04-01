import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { Project } from "../../inrterfaces/projectInterface";
import { useNavigation } from "@react-navigation/native";
import { TaskList } from "../../screens/ProjectsScreen";

interface Props {
  project: TaskList;
}

const ProjectItem = ({ project }: Props) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate("TodoScreen", { id: project.id });
  };
  return (
    <Pressable style={styles.projectStyle} onPress={navigate}>
      <AntDesign name="file1" size={25} color="gray" style={styles.iconStyle} />
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.projectDate}>{project.createdAt}</Text>
    </Pressable>
  );
};

export default ProjectItem;

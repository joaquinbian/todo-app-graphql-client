import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { Project } from "../../inrterfaces/projectInterface";

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  return (
    <Pressable
      style={styles.projectStyle}
      onPress={() => console.log("apretado")}
    >
      <AntDesign name="file1" size={25} color="gray" style={styles.iconStyle} />
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.projectDate}>{project.createdAt}</Text>
    </Pressable>
  );
};

export default ProjectItem;

import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { Project } from "../../inrterfaces/projectInterface";

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  return (
    <View style={styles.projectStyle}>
      <AntDesign name="file1" size={25} color="gray" style={styles.iconStyle} />
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.projectDate}>{project.createdAt}</Text>
    </View>
  );
};

export default ProjectItem;

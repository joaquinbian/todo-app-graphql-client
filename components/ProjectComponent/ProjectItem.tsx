import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { styles } from "./styles";
import { Project } from "../../inrterfaces/projectInterface";
import { useNavigation } from "@react-navigation/native";
import { TaskList } from "../../inrterfaces/taskListInterface";

interface Props {
  project: TaskList;
}

const ProjectItem = ({ project }: Props) => {
  const navigation = useNavigation();

  console.log(project.title);

  const navigate = () => {
    navigation.navigate("TodoScreen", { id: project.id });
  };

  console.log("me ejecuto project item");

  return (
    // <Text style={{ color: "white" }}>{project.title}</Text>
    <Animated.View entering={SlideInRight}>
      <Pressable
        style={[styles.projectStyle, { backgroundColor: "red" }]}
        onPress={navigate}
      >
        <AntDesign
          name="file1"
          size={25}
          color="gray"
          style={styles.iconStyle}
        />
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.projectDate}>{project.createdAt}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ProjectItem;

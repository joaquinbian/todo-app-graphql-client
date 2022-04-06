import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import ProjectItem from "../components/ProjectComponent/ProjectItem";
import { useEffect, useState } from "react";
import { Project } from "../inrterfaces/projectInterface";
import { gql, useQuery } from "@apollo/client";
import { User } from "../inrterfaces/userInterface";
import { GetTaskListData } from "../inrterfaces/graphql-Interfaces/getTaskListInterface";
import { ToDo } from "../inrterfaces/todoInterface";
import Animated, { SlideInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaskList } from "../inrterfaces/taskListInterface";
import { Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useApplyHeaderWorkaround from "../hooks/useApplyHeaderWorkaround";
import { StackScreenProps } from "@react-navigation/stack";

const GET_TASKLIST = gql`
  query GetTaskList {
    getTaskList {
      id
      title
      createdAt
      progress
      users {
        id
        name
        email
        avatar
      }
      toDos {
        id
        content
        isCompleted
      }
    }
  }
`;

interface Props extends StackScreenProps<RootStackParamList, "Home"> {}

export default function ProjectsScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<TaskList[]>();
  const { data, loading, error } = useQuery<GetTaskListData>(GET_TASKLIST, {
    onError: (e) => {
      Alert.alert(e.message);
    },
  });
  useApplyHeaderWorkaround(navigation.setOptions);

  useEffect(() => {
    setProjects(data?.getTaskList);
  }, [data]);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator color="white" size={24} />
        <Text>Loading task list ...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProjectItem project={item} />}
        ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

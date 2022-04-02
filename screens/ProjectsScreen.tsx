import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
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

// id: ID!
//     title: String!
//     createdAt: String!
//     progress: Float!
//     users: [User!]!
//     toDos: [ToDo!]!

export interface TaskList {
  id: any;
  title: string;
  createdAt: string;
  progress: number;
  users: User[];
  toDos: ToDo[];
}

const renderItem = ({
  item,
  index,
}: {
  item: { name: string };
  index: number;
}) => {
  return (
    <Animated.View entering={SlideInRight}>
      <Text style={{ color: "white", fontWeight: "bold" }}>{item.name}</Text>
    </Animated.View>
  );
};

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<TaskList[]>();
  const { data, loading, error } = useQuery<GetTaskListData>(GET_TASKLIST, {
    onCompleted: (data) => {
      console.log("me complete get tasklist");
      // console.log(data.getTaskList.length);
      // setProjects(data.getTaskList);
    },
    // fetchPolicy: "network-only",
  });
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    setProjects(data?.getTaskList);
  }, [data]);

  if (loading) {
    return (
      <View style={[styles.container, { marginTop: top + 50 }]}>
        <ActivityIndicator color="white" size={24} />
        <Text>Loading task list ...</Text>
      </View>
    );
  }

  return (
    // <View style={[styles.container, { marginTop: top + 60 }]}>
    <SafeAreaView style={[styles.container, { marginTop: top + 60 }]}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProjectItem project={item} />}
        ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
      />
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

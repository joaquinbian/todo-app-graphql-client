import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

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
import Animated from "react-native-reanimated";

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

  console.log({ error });

  // console.log({ data }, "en projects screen");

  // console.log({ data });
  console.log(projects?.length, "projects length");

  useEffect(() => {
    console.log("me ejecuto useefect de data");

    // setProjects(data?.getTaskList);
  }, [data]);

  if (loading) {
    return (
      <View style={{ alignItems: "center" }}>
        <ActivityIndicator color="white" size={24} />
        <Text>Loading task list ...</Text>
      </View>
    );
  }

  console.log({ loading });

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.getTaskList}
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

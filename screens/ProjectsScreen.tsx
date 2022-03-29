import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import ProjectItem from "../components/ProjectComponent/ProjectItem";
import { useEffect, useState } from "react";
import { Project } from "../inrterfaces/projectInterface";
import { gql, useQuery } from "@apollo/client";

const GET_TASKLIST = gql`
  query {
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

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>();
  const { data, loading, error } = useQuery(GET_TASKLIST);

  console.log({ data }, "en projects screen");

  useEffect(() => {
    setProjects(data?.getTaskList);
  }, [data]);

  if (loading) {
    return (
      <View style={{ alignItems: "center" }}>
        <ActivityIndicator color="white" size={24} />
        <Text>Loading task list ...</Text>
      </View>
    );
  }

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

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";
import Checkbox from "../components/Checkbox";
import TodoItem from "../components/TodoItem";
import { ToDo } from "../inrterfaces/todoInterface";
import { gql, useQuery } from "@apollo/client";
import { TaskList } from "../inrterfaces/taskListInterface";
import {
  GetTaskListByIdData,
  GetTaskListByIdVars,
} from "../inrterfaces/graphql-Interfaces/getTaskListByIdInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useApplyHeaderWorkaround from "../hooks/useApplyHeaderWorkaround";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackScreenProps } from "@react-navigation/stack";

const GET_TODOLIST = gql`
  query getTaskListById($id: ID!) {
    getTaskListById(id: $id) {
      id
      title
      createdAt
      progress
      toDos {
        id
        content
        isCompleted
      }
    }
  }
`;

interface Props extends StackScreenProps<RootStackParamList, "TodoScreen"> {}

export default function TodoScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState<string | undefined>("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const { data, error, loading } = useQuery<
    GetTaskListByIdData,
    GetTaskListByIdVars
  >(GET_TODOLIST, {
    variables: { id: route.params.id },
  });
  useApplyHeaderWorkaround(navigation.setOptions);
  const headerHeight = useHeaderHeight();
  const createItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index + 1, 0, {
      content: "",
      id: Date.now(),
      isCompleted: false,
      taskList: null,
    });
    setTodos(newTodos);
  };

  const deleteItem = (id: number) => {
    setTodos((list) => list?.filter((item) => item.id !== id));
  };
  useEffect(() => {
    setTodos(data?.getTaskListById?.toDos!);
    setTitle(data?.getTaskListById.title);
  }, [data]);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={24} />
        <Text>loading toDos...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      // keyboardVerticalOffset={-500}
      enabled
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Tab One</Text> */}
        <TextInput
          style={styles.title}
          value={title}
          defaultValue={data?.getTaskListById.title!}
          onChangeText={setTitle}
          placeholder="todo list title..."
          // placeholderTextColor="rgba(255, 255, 255, .3)"
          placeholderTextColor="red"
        />
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <TodoItem
              createItem={() => createItem(index)}
              deleteItem={(id) => deleteItem(id)}
              todo={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: "100%",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
